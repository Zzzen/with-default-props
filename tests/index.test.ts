import { withDefaultProps } from "..";

describe("withDefaultProps", () => {
  type Props = {
    a: string;
    b: number;
    c: () => void;
  };

  function Comp(props: Props) {
    return props;
  }

  it("should work with empty props", () => {
    const Wrapped = withDefaultProps(Comp, {});
    const noop = () => {};
    const props = { a: "", b: 0, c: noop };
    expect(Wrapped(props)).toEqual(props);
  });

  it("should work with non-empty props", () => {
    const Wrapped = withDefaultProps(Comp, { a: "hello" });
    const noop = () => {};
    const props = { b: 0, c: noop };
    expect(Wrapped(props)).toEqual({ ...props, a: "hello" });
  });

  it("should override default props", () => {
    const Wrapped = withDefaultProps(Comp, { a: "hello" });
    const noop = () => {};
    const props = { a: "world", b: 0, c: noop };
    expect(Wrapped(props)).toEqual({ ...props, a: "world" });
  });

  it("should pass `ref` parameter", () => {
    function Comp(_props: {}, ref: unknown) {
      return ref;
    }

    const Wrapped = withDefaultProps(Comp, {});
    const ref = Symbol("ref");
    expect(Wrapped({}, ref)).toBe(ref);
  });

  it("should infer types", () => {
    interface Props {
      width: number;
      audioFile: string;
      onPosChange: (ev: any) => void;
    }
    
    function Ccc(props: Props) {
        return props.width
    }

    withDefaultProps(Ccc, { width: 123, onPosChange: () => {} })
  })
});
