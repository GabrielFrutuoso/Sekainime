import "./App.css";
import { Sidebar } from "./components/ui/Sidebar/Sidebar";
import { AppRoutes } from "./route/Routes";
import { QueryProvider } from "./service/QueryProvider";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import { BrowserRouter } from "react-router-dom";
import { TitleBar } from "./components/ui/TitleBar/TitleBar";

function App() {
  return (
    <main className="h-screen overflow-hidden flex flex-col">
      <TitleBar />
      <QueryProvider>
        <BrowserRouter>
          <ResizablePanelGroup className="flex-1 w-full">
            <ResizablePanel defaultSize={250} minSize={250} maxSize={350}>
              <Sidebar />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={80}>
              <div className="flex h-full overflow-hidden bg-sidebar">
                <AppRoutes />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </BrowserRouter>
      </QueryProvider>
    </main>
  );
}

export default App;
