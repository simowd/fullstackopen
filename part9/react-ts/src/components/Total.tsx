import React from "react";

interface TotalProps {
    exerciseCount: number
}

const Total = ({ exerciseCount }: TotalProps): JSX.Element => {
    return (
        <>
            <p>
                Number of exercises{" "}
                { exerciseCount }
            </p>
        </>
    )
};

export default Total;