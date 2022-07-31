import React, { useEffect } from 'react'
import { useState } from 'react';

export const useDevouncedValue = (input: string = '', time: number = 500) => {

    const [ devouncedValue, setDevouncedValue] = useState(input);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDevouncedValue( input );
        }, time);

        return () => {
            clearTimeout( timeout );
        }
    }, [input])
    
    return devouncedValue;
}
