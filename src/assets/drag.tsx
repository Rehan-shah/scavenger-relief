import Pin from "../../public/pin";
import Map from "../../public/map";

import React, { useState, useRef, useEffect } from 'react';

const PannableContainer = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: -350 });
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [showDisplay, setShowDisplay] = useState(false);
    const [detail, setDetail] = useState({
        x: 500,
        y: 400,
        description: "Ujjain",
        image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    });

    const containerRef = useRef(null);
    const hideTimeout = useRef(null);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartPos({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const newX = e.clientX - startPos.x;
        const newY = e.clientY - startPos.y;

        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        const viewportWidth = 200;
        const viewportHeight = 200;

        const boundedX = Math.min(Math.max(newX, -(containerWidth - viewportWidth)), 0);
        const boundedY = Math.min(Math.max(newY, -(containerHeight - viewportHeight)), 0);

        setPosition({
            x: boundedX,
            y: boundedY,
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, startPos]);

    const liHow = {
        ujjain: {
            description: "In Ujjain, distributed 50 essential relief kits across five villages, focusing on marginalized families. Collaborated with local volunteers for efficient delivery.",
            image: "ujjain.png"
        },
        ahmedabad: {
            description: "Visited low-income neighborhoods in Ahmedabad and coordinated with local government representatives to identify families in need. Distributed over 100 kits.",
            image: "ahmedabad.png"
        },
        surat: {
            description: "Distributed 80 relief kits in Surat's rural areas. Prioritized regions affected by recent floods, ensuring timely delivery with the help of local NGOs.",
            image: "surat.png"
        },
        dwarka: {
            description: "In Dwarka, distributed 150 kits with the assistance of religious leaders and temples. Focused on supporting families from economically weaker sections by leveraging community networks.",
            image: "dwarka.png"
        }
    };

    const click = (city, event) => {
        const cityData = liHow[city];
        if (cityData) {
            setShowDisplay(true);
            clearTimeout(hideTimeout.current); // Prevent hiding if user quickly hovers over another pin
            setDetail({
                ...cityData,
                x: event.clientX - 100,
                y: event.clientY - 400
            });
        }
    };

    const handleMouseLeave = () => {
        hideTimeout.current = setTimeout(() => {
            setShowDisplay(false);
        }, 300); // Delay hiding for smoother transitions
    };

    return (
        <>
            {showDisplay && (
                <div
                    style={{
                        backgroundColor: "#E4E5DC",
                        padding: "10px",
                        width: "250px",
                        border: "1px solid black",
                        borderRadius: "10px",
                        position: "fixed",
                        top: detail.y,
                        left: detail.x,
                        zIndex: 2,
                        transition: "opacity 0.3s ease, top 0.3s ease, left 0.3s ease",
                        opacity: showDisplay ? 1 : 0
                    }}
                >
                    <img style={{ width: "250px", borderRadius: "5px" }} src={detail.image} />
                    <p>{detail.description}</p>
                </div>
            )}
            <div
                style={{
                    height: "60vh",
                    overflow: "hidden",
                    border: "2px solid black",
                    position: "relative",
                    cursor: isDragging ? "grabbing" : "grab",
                    fontWeight: 400,
                    color: "#585857"
                }}
                onMouseDown={handleMouseDown}
            >
                <div
                    ref={containerRef}
                    style={{
                        position: "absolute",
                        transform: `translate(${position.x}px, ${position.y}px)`,
                        userSelect: "none",
                        padding: "10px"
                    }}
                >
                    <Map />
                    {Object.keys(liHow).map((city, index) => {
                        const positions = {
                            ujjain: { left: "20vw", bottom: "650px" },
                            ahmedabad: { left: "10vw", bottom: "700px" },
                            surat: { left: "4vw", bottom: "630px" },
                            dwarka: { left: "13vw", bottom: "600px" }
                        };

                        return (
                            <div
                                key={city}
                                onMouseOver={(event) => click(city, event)}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    ...positions[city],
                                    height: "3.5vw",
                                    position: "absolute",
                                    display: "flex"
                                }}
                            >
                                <Pin />
                                <h4 style={{ fontSize: "16pt", margin: "0px" }}>{city.charAt(0).toUpperCase() + city.slice(1)}</h4>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default PannableContainer;

