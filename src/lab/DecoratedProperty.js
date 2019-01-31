function Bar(value) {
  return function (target, property, descriptor) {
    const fn = descriptor.value;

    descriptor.value = function(...args) {
      console.log(value);
      console.log(property)
      // fn.call(this);
    };

    return descriptor;
  };
}

class DecoratedClass {

  @Bar('bar')
  hello () {
    alert('hello');
  }

}

const decoratedClass = new DecoratedClass();
decoratedClass.hello(); // 'bar'