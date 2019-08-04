export interface ComponentTemplateOptions {
    [key: string]: any
}

export type ComponentTemplate<O> = (O: ComponentTemplateOptions) => string;

export type ComponentOptions<O> = {
    selector: string
    template: ComponentTemplate<O>
}