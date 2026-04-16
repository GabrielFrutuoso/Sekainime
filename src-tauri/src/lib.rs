use std::process::Command;
use std::sync::Mutex;
use tauri::Manager;

struct ServerProcess(Mutex<Option<std::process::Child>>);

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(ServerProcess(Mutex::new(None)))
        .invoke_handler(tauri::generate_handler![])
        .setup(|app| {
            let resource_path = app
                .path()
                .resource_dir()
                .expect("failed to get resource dir")
                .join("server")
                .join("server.exe");

            if !resource_path.exists() {
                panic!("Server executable not found at: {:?}", resource_path);
            }

            #[cfg(target_os = "windows")]
            let child = {
                use std::os::windows::process::CommandExt;
                Command::new(&resource_path)
                    .creation_flags(0x08000000)
                    .spawn()
                    .expect("failed to spawn server process")
            };

            #[cfg(not(target_os = "windows"))]
            let child = Command::new(&resource_path)
                .spawn()
                .expect("failed to spawn server process");

            *app.state::<ServerProcess>().0.lock().unwrap() = Some(child);

            Ok(())
        })
        .on_window_event(|window, event| {
            if let tauri::WindowEvent::Destroyed = event {
                let app = window.app_handle();
                if let Some(mut child) = app
                    .state::<ServerProcess>()
                    .0
                    .lock()
                    .unwrap()
                    .take()
                {
                    child.kill().expect("failed to kill server process");
                }
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}