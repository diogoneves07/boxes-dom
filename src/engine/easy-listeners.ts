export const [lOnNormalize, onGlobalNormalize] = ((l: string) => [
  WrapOn<NormalBoxEvent>(l),
  GlobalEvents<NormalBoxEvent>(l),
])("@normalize");
