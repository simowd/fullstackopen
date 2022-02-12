import React from "react";
import { CoursePart } from '../types';
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }): JSX.Element => {
    return (
        <>
            {
                courseParts.map((course, index) => <Part key={index} content={ course }/>)
            }
        </>
    )
};

export default Content;