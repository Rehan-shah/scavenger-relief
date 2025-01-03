


import Pin from "../../public/pin";
import Map from "../../public/map";

import React, { useState, useRef, useEffect } from 'react';
import { deselectScripts } from "astro/virtual-modules/transitions-swap-functions.js";

const PannableContainer = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: -350 });
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const containerRef = useRef(null);

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
        "ujjain": {
            description: "In Ujjain, distributed 50 essential relief kits across five villages, focusing on marginalized families. Collaborated with local volunteers for efficient delivery.",
            image: "ujjain.png"
        },
        "ahmedabad": {
            description: "Visited low-income neighborhoods in Ahmedabad and coordinated with local government representatives to identify families in need. Distributed over 100 kits containing food, hygiene supplies, and clothing.",
            image: "ahmedabad.png"
        },
        "surat": {
            description: "Distributed 80 relief kits in Surat's rural areas. Prioritized regions affected by recent floods, ensuring timely delivery with the help of local NGOs.",
            image: "surat.png"
        },
        "dwarka": {
            description: "In Dwarka, distributed 150 kits with the assistance of religious leaders and temples. Focused on supporting families from economically weaker sections by leveraging community networks.",
            image: "dwarka.png"
        }
    };

    const [showDisplay, setShowDisplay] = useState(false)
    const [detail, setDetail] = useState({
        x: 500,
        y: 400,

        description: 'Ujjain',
        image: 'https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    })
    return (
        <div
            style={{
                width: '50vw',
                height: '60vh',
                overflow: 'hidden',
                border: '2px solid black',
                position: 'relative',
                cursor: isDragging ? 'grabbing' : 'grab',
                fontWeight: 400,
                color: '#585857'
            }}
            onMouseDown={handleMouseDown}
        >
            <div
                ref={containerRef}
                style={{
                    position: 'absolute',
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    userSelect: 'none',
                    padding: '10px',
                }}
            >

                {showDisplay && <div style={{
                    backgroundColor: '#E4E5DC',
                    padding: '10px',
                    width: '250px',
                    border: '1px solid black',
                    borderRadius: '10px',
                    position: 'fixed',
                    top: detail.y,
                    zIndex: 2,
                    left: detail.x,
                }} >
                    <img style={{ width: "250px", borderRadius: "5px" }} src={detail.image} />
                    <p>{detail.description}</p>
                </div>}
                <Map />
                <div
                    onMouseOver={(en) => {
                        setShowDisplay(true);
                        setDetail(
                            { ...liHow["ujjain"], x: en.clientX - 800, y: en.clientY - 400 }
                        );

                    }}
                    onMouseLeave={() => { setShowDisplay(false) }}
                    style={{ height: '3.5vw', position: 'absolute', left: '20vw', bottom: '650px', display: 'flex' }}>

                    <Pin />
                    <h4 style={{ fontSize: '16pt', margin: '0px' }}>Ujjian</h4>
                </div>

                <div

                    onMouseOver={(en) => {
                        setShowDisplay(true);
                        setDetail(
                            { ...liHow["ahmedabad"], x: en.clientX - 600, y: en.clientY - 350 }
                        );

                    }}
                    onMouseLeave={() => { setShowDisplay(false) }}
                    style={{ height: '3.5vw', position: 'absolute', left: '10vw', bottom: '700px', display: 'flex' }}>
                    <Pin />
                    <h4 style={{ fontSize: '16pt', margin: '0px' }}>Ahmedabad</h4>
                </div>

                <div

                    onMouseOver={(en) => {
                        setShowDisplay(true);
                        setDetail(
                            { ...liHow["surat"], x: en.clientX - 600, y: en.clientY - 350 }
                        );

                    }}
                    onMouseLeave={() => { setShowDisplay(false) }}
                    style={{ height: '3.5vw', position: 'absolute', left: '4vw', bottom: '630px', display: 'flex' }}>
                    <Pin />
                    <h4 style={{ fontSize: '16pt', margin: '0px' }}>Surat</h4>
                </div>

                <div


                    onMouseOver={(en) => {
                        setShowDisplay(true);
                        setDetail(
                            { ...liHow["dwarka"], x: en.clientX - 600, y: en.clientY - 400 }

                        );

                    }}
                    onMouseLeave={() => { setShowDisplay(false) }}
                    style={{ height: '3.5vw', position: 'absolute', left: '13vw', bottom: '600px', display: 'flex' }}>
                    <Pin />
                    <h4 style={{ fontSize: '16pt', margin: '0px' }}>Durwaka</h4>
                </div>
            </div>
        </div >
    );
};

export default PannableContainer;
