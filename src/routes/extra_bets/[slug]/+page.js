export const load = ({ params, url }) => {
    const fixtureId = params.slug;
    const upcoming = url.searchParams.get('upcoming') === 'true';

    return {
        fixture_id: fixtureId,
        upcoming: upcoming
    }
}