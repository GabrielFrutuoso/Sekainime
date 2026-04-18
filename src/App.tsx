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

function App() {
  return (
    <main className="h-screen overflow-hidden flex">
      <QueryProvider>
        <BrowserRouter>
          <ResizablePanelGroup className="h-full w-full">
            <ResizablePanel defaultSize={300} minSize={250} maxSize={350}>
              <Sidebar />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={80}>
              <div className="flex h-full">
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
