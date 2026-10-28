export interface IMapper<Domain, Presentation> {
    toPresentation(domain: Domain): Presentation;
}