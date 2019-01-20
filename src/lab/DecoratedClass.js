function Foo(value) {
  return function(target) {
    target.foo = value;
  };
}

@Foo('foo')
class DecoratedClass {

}

console.log(DecoratedClass.foo); // 'foo'