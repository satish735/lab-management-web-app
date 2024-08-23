const UserSvg = () => { return (<div>
    <svg className="svg-pathes" width="0" height="0"
        xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
            <filter id="rounded-clippath-filter">
                <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur"></feGaussianBlur>
                <feColorMatrix in="blur" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 19 -9" result="rounded-clippath-filter"></feColorMatrix>
                <feComposite in="SourceGraphic" in2="rounded-clippath-filter" operator="atop"></feComposite>
            </filter>
        </defs>
        <defs>
            <filter id="rounded-clippath-filter-small">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"></feGaussianBlur>
                <feColorMatrix in="blur" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 10 -4" result="rounded-clippath-filter-small"></feColorMatrix>
                <feComposite in="SourceGraphic" in2="rounded-clippath-filter-small" operator="atop"></feComposite>
            </filter>
        </defs>
        <clipPath id="curve-left" clipPathUnits="objectBoundingBox">
            <path d="M0,0.998 v0.002 H1 V0 h-0.059 C0.832,0.008,0.596,0.068,0.48,0.414 A1,1,0,0,0,0.445,0.551 C0.376,0.899,0.166,0.986,0,0.998"></path>
        </clipPath>
        <clipPath id="curve-right" clipPathUnits="objectBoundingBox">
            <path d="M1,0.998 v0.002 H0 V0 H0.059 C0.168,0.008,0.404,0.068,0.519,0.414 A1,1,0,0,1,0.555,0.551 C0.624,0.899,0.834,0.986,1,0.998"></path>
        </clipPath>
        <clipPath id="curve-shape" clipPathUnits="objectBoundingBox">
            <path d="M1600,3277.99c-152.02-27.95-453.41-46.99-800.382-46.99-346.4,0-647.36,19.12-799.618,47Z" transform="translate(0 -3231)"></path>
        </clipPath>
    </svg>
</div> ); }; export default UserSvg;