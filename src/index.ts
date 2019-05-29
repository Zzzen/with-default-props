type RequiredKeys<T> = {
  [K in keyof T]-?: ({} extends { [P in K]: T[K] } ? never : K)
}[keyof T];

type MissingProps<Defaults, Props extends Defaults> = Pick<
  Props,
  Exclude<keyof Props, RequiredKeys<Defaults>>
>;

type WithDefaultProps<Defaults, Props extends Defaults> = MissingProps<
  Defaults,
  Props
> &
  { [P in RequiredKeys<Defaults>]?: Defaults[P] };

export default function withDefaultProps<
  Defaults,
  Props extends Defaults,
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

function getDisplayName(WrappedComponent: any) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
