const parseSpecJson = (specJson) => {
  describe(specJson.describe, () => {
    for (let i = 0; i < specJson.flow.length; i++) {
      const flow = specJson.flow[i];
      it(flow.it, async () => {
        for (let j = 0; j < flow.steps.length; j++) {
          const step = flow.steps[j];
          const targetElement = element(by[step.element.by](step.element.value));
          if (step.type === 'assertion') {
            await expect(targetElement)[step.effect.key](step.effect.value);
          } else {
            await targetElement[step.effect.key](step.effect.value);
          }
        }
      });
    }
  });
};

//require('./tests/login');

parseSpecJson(require('./tests/login.json'));
