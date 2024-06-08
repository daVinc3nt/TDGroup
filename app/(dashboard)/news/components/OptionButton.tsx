import React from 'react';
import { Button } from "@nextui-org/react";
import { FormattedMessage } from 'react-intl';

const OptionButton = ({ id, labelId, option, setOption }) => (
    <Button
        className={`w-[calc(12.5%)] flex flex-row p-2 ${option === id ? "text-red-500 font-semibold" : "text-black"}`}
        onClick={() => setOption(id)}
    >
        <span className="text-sm sm:text-base">
            {labelId}
        </span>
    </Button>
);

export default OptionButton;
