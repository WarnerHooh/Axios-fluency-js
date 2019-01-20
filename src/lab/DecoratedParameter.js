function Required(key) {
  return function (target, property, index) {
    const metadata = `meta_${property}`;
    target[metadata] = [
      ...target[metadata] || [],
      {
        index,
        key
      }
    ]
  };
}

function Validate(value) {
  return function (target, property, descriptor) {
    const fn = descriptor.value;

    descriptor.value = function(...args) {
      const metadata = `meta_${property}`;
      target[metadata].forEach(function(metadata) {
        if (args[metadata.index] === undefined) {
          throw new Error(`${metadata.key} is required`);
        }
      });
      debugger

      return fn.apply(target, args)
    };

    return descriptor;
  };
}

class DecoratedClass {

  @Validate()
  hello (@Required('id') id, @Required('name') name) {
    console.log(id, name)
  }

}

const decoratedClass = new DecoratedClass();

decoratedClass.hello(0, 'Wiz');
decoratedClass.hello(1);