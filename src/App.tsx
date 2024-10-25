import "./index.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import TaskPage from "src/Tasks/TaskPage";
import Accordion from "src/Tasks/Accordion";

function App() {
    const location = useLocation();
    const isTaskPage = location.pathname.startsWith("/task/");

    return (
        <div className="container">
            <div className="body">
                <div className="task">
                    <Accordion />
                </div>
                {isTaskPage && (
                    <div className="block">
                        <Routes>
                            <Route path="/task/:id" element={<TaskPage />} />
                        </Routes>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
