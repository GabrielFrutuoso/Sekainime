import "./App.css";
import { AppRoutes } from "./route/Routes";
import { QueryProvider } from "./service/QueryProvider";

function App() {
  return (
    <main>
      <QueryProvider>
        <AppRoutes />
      </QueryProvider>
    </main>
  );
}

export default App;
