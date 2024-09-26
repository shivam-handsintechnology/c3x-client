import React from 'react'

const History = () => {

    const Timeline = ({ events }) => {
        return (
            <div className="h-full overflow-hidden">
                <div className="p-4">
                    <div className="overflow-y-auto h-[calc(100%-3rem)] px-4 pb-4">
                        <div className="space-y-4">
                            {events.map((event, index) => (
                                <div key={index} className="d-flex ">
                                    <div className="block-one mb-2 ">
                                        <p className="mt-1 mb-0 text-end">{event.date}</p>
                                        <p className="text-gray-600 text-end mb-1">{event.time}</p>
                                    </div>
                                    <div className=" flex align-items-center mr-4">
                                        <div className="timeline-dot "></div>
                                        <div className="timeline-line "></div>

                                    </div>
                                    <div className="block-two mb-2">
                                        <p className="mt-1 mb-0">{event.description}</p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    const timelineEvents = [
        {
            time: "08:45 am",
            date: "11th Sep 2024",

            description: "This is the description for event 1."
        },
        {
            time: "08:45 am",
            date: "11th Sep 2024",
            description: "This is the description for event 2."
        },
        {
            time: "08:45 am",
            date: "12th Sep 2024",
            description: "This is the description for event 2."
        },
        {
            time: "08:45 am",
            date: "12th Sep 2024",
            description: "This is the description for event 3."
        },
        {
            time: "08:45 am",
            date: "11th Sep 2024",

            description: "This is the description for event 1."
        },
        {
            time: "08:45 am",
            date: "11th Sep 2024",
            description: "This is the description for event 2."
        },
        {
            time: "08:45 am",
            date: "12th Sep 2024",
            description: "This is the description for event 2."
        },
        {
            time: "08:45 am",
            date: "12th Sep 2024",
            description: "This is the description for event 3."
        }, {
            time: "08:45 am",
            date: "11th Sep 2024",

            description: "This is the description for event 1."
        },
        {
            time: "08:45 am",
            date: "11th Sep 2024",
            description: "This is the description for event 2."
        },
        {
            time: "08:45 am",
            date: "12th Sep 2024",
            description: "This is the description for event 2."
        },
        {
            time: "08:45 am",
            date: "12th Sep 2024",
            description: "This is the description for event 3."
        }, {
            time: "08:45 am",
            date: "11th Sep 2024",

            description: "This is the description for event 1."
        },
        {
            time: "08:45 am",
            date: "11th Sep 2024",
            description: "This is the description for event 2."
        },
        {
            time: "08:45 am",
            date: "12th Sep 2024",
            description: "This is the description for event 2."
        },
        {
            time: "08:45 am",
            date: "12th Sep 2024",
            description: "This is the description for event 3."
        }, {
            time: "08:45 am",
            date: "11th Sep 2024",

            description: "This is the description for event 1."
        },
        {
            time: "08:45 am",
            date: "11th Sep 2024",
            description: "This is the description for event 2."
        },
        {
            time: "08:45 am",
            date: "12th Sep 2024",
            description: "This is the description for event 2."
        },
        {
            time: "08:45 am",
            date: "12th Sep 2024",
            description: "This is the description for event 3."
        }, {
            time: "08:45 am",
            date: "11th Sep 2024",

            description: "This is the description for event 1."
        },
        {
            time: "08:45 am",
            date: "11th Sep 2024",
            description: "This is the description for event 2."
        },
        {
            time: "08:45 am",
            date: "12th Sep 2024",
            description: "This is the description for event 2."
        },
        {
            time: "08:45 am",
            date: "12th Sep 2024",
            description: "This is the description for event 3."
        }
    ];
    return (
        <div className='blocks-tab overflow-y-auto'>
            <Timeline events={timelineEvents} />
        </div>
    )
}
export default History