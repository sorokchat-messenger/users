export class GetUserByTermQuery {
    public constructor(
        public readonly term: string,
        public readonly limit: number,
        public readonly offset: number
    ) { }
}