type RequiredKeys<T> = {
  [K in keyof T]-?: ({} extends { [P in K]: T[K] } ? never : K)
}[keyof T];

type MissingProps<Defaults, Props> = Pick<
  Props,
  Exclude<keyof Props, RequiredKeys<Defaults>>
>;

type WithDefaultProps<Defaults, Props> = MissingProps<
  Defaults,
  Props
> &
  { [P in RequiredKeys<Defaults>]?: Defaults[P] };

export function withDefaultProps<
  Defaults,
  Props,
  Ret,
  RefParam
>(
  Comp: (props: Props, ref: RefParam) => Ret,
  defaults: Defaults
): (props: WithDefaultProps<Defaults, Props>, ref?: RefParam) => Ret {
  function Wrapped(props: WithDefaultProps<Defaults, Props>, ref?: RefParam) {
    const np = (Object.assign({}, defaults, props) as unknown) as Props;
    return Comp(np, ref as RefParam);
  }

  (Wrapped as any).displayName = `WithDefaultProps(${getDisplayName(Comp)})`;

  return Wrapped;
}

export default withDefaultProps;

function getDisplayName(WrappedComponent: any) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
