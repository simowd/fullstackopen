import React from "react";

interface Course {
    name: string,
    exerciseCount: number
}

const Content = ({ courseParts }: { courseParts: Array<Course> }): JSX.Element => {
    return (
        <>
            {
                courseParts.map((course, index) => <p key={index}>
                    {course.name} {course.exerciseCount}
                </p>)
            }
        </>
    )
};

export default Content;