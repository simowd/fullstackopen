import React from "react";
import { CoursePart } from "../types";

const Part = ({ content }: { content: CoursePart }): JSX.Element => {
    let formatting = null;
    switch (content.type) {
        case 'normal':
            formatting = <div> <h4>{content.name} {content.exerciseCount}</h4>{content.description}</div>
            break;
        case 'groupProject':
            formatting = <div> <h4>{content.name} {content.exerciseCount}</h4>project exercises: {content.groupProjectCount}</div>
            break;
        case 'submission':
            formatting = <div> <h4>{content.name} {content.exerciseCount}</h4>{content.description} <br /> submit to {content.exerciseSubmissionLink} </div>
            break;
        case 'special':
            formatting = <div> <h4>{content.name} {content.exerciseCount}</h4>{content.description} <br /> required skills: {content.requirements.map((req, i) => <p key={i}>{req}</p>)}  </div>
            break;
        default:
            break;
    }
    return (
        <>
            {formatting}
        </>
    )
};

export default Part;