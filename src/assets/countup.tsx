
import { useEffect, useState, useRef } from "react"
import CountUp from "react-countup";

export default function CountUpComponent({ input }: { input: string }) {
    const [isVisible, setIsVisible] = useState(false);
    const countUpRef = useRef(null);

    let prefix = '';
    if (isNaN(parseInt(input[0]))) {
        prefix = input[0];
    }

    if (isNaN(parseInt(input[input.length - 1]))) {
        prefix = input[input.length - 1];
    }

    const targNumber = +input.replace(prefix, '');

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update our state when observer callback fires
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.1 // Trigger when at least 10% of the element is visible
            }
        );

        if (countUpRef.current) {
            observer.observe(countUpRef.current);
        }

        return () => {
            if (countUpRef.current) {
                observer.unobserve(countUpRef.current);
            }
        };
    }, []);

    return (
        <h3
            ref={countUpRef}
            style={{ fontSize: '30pt', margin: '10px 0 0 0', padding: '10px' }}
        >
            {prefix}{' '}
            {isVisible && (
                <CountUp
                    start={0}
                    end={targNumber}
                    duration={1}
                />
            )}
        </h3>
    );
}
