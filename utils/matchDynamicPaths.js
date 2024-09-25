function matchDynamicPaths(routePath, pathname) {
    if (!routePath || !pathname) {
        return false
    }
    const routeSegments = routePath.split('/').filter(Boolean);
    const pathSegments = pathname.split('/').filter(Boolean);

    if (routeSegments.length !== pathSegments.length) return false;

    return routeSegments.every((segment, index) =>
        segment.startsWith('[') && segment.endsWith(']') || segment === pathSegments[index]
    );
}

export default matchDynamicPaths