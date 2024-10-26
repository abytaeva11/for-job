import "./index.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import Accordion2 from "src/Tasks2/Accordion";
import TaskPage2 from "src/Tasks2/TaskPage";


function App() {
    const location = useLocation();
    const isTaskPage = location.pathname.startsWith("/task/");

    return (
        <div className="container">
            <div className="body">
                <div className="task">
                    <Accordion2 />
                </div>
                <div className="block">
                    {isTaskPage && (
                        <div >
                            <Routes>
                                <Route path="/task/:id" element={<TaskPage2 />} />
                            </Routes>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default App;
