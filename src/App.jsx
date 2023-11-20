import { useEffect, useState, useCallback } from 'react';
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import PatentSearchPage from './PatentSearchPage';
import './styles/App.css';
import PhasePlotPage from './PhasePlotPage';

const router = createBrowserRouter([
    {
      path: "search",
      element: (<PatentSearchPage />),
    },
    {
      path: "plot",
      element: (<PhasePlotPage />),
    },
]);

const App = () => {

    return (
        <div className='main_container'>
            <RouterProvider router={router}/>
        </div>
    );
};

export default App;
