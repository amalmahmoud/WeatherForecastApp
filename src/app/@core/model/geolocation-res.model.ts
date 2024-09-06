export interface GeoLocationRes {
    type: string;
    features: Features[];
    query:QueryInfo
}
interface Features {
    type: string;
    properties: Properties;
    geometry: Geometry;
    bbox:Number[];
}
interface Properties {

    datasource: DataSource;
    country: string;
    country_code: string;
    state: string;
    city: string;
    postcode: string;
    suburb: string;
    street: string;
    housenumber: string;
    lon: number;
    lat: number;
    distance: number;
    result_type: string;
    formatted: string;
    address_line1: string;
    address_line2: string;
    timezone: TimeZone;
    plus_code: string;
    plus_code_short: string;
    rank: Rank;
    place_id: string;
}
interface DataSource
{
    sourcename: string;
    attribution: string;
    license: string;
    url: string;

}
interface TimeZone
{
    name: string;
    offset_STD: string;
    offset_STD_seconds: number;
    offset_DST: string;
    offset_DST_seconds: number;
    abbreviation_STD: string;
    abbreviation_DST: string;
}
interface Rank
{
    importance: number
    popularity: number
}
interface Geometry {
    type: string;
    coordinates: Number[]
}
interface QueryInfo
{
    lat: number;
    lon: number;
    plus_code: string;
}