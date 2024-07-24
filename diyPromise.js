class SimplePromise {
  constructor(executor) {
    this.state = 'pending'; // 初始化状态
    this.value = null;     // 用来储存结果
    this.handlers = [];    // 用来储存回调

    try {
      executor(this._resolve, this._reject);
    } catch (err) {
      this._reject(err);
    }
  }

  _resolve = (value) => {
    this.updateResult(value, 'fulfilled');
  }

  _reject = (error) => {
    this.updateResult(error, 'rejected');
  }

  updateResult(value, state) {
    setTimeout(() => {
      if (this.state !== 'pending') return; // 状态一旦改变，就不再变化

      if (value && (typeof value === 'object' || typeof value === 'function')) {
        const { then } = value;
        if (typeof then === 'function') {
          // 处理 value 是另一个 promise 的情况
          then.call(value, this._resolve, this._reject);
          return;
        }
      }

      this.state = state;
      this.value = value;

      this.executeHandlers();
    }, 0);
  }

  executeHandlers() {
    if (this.state === 'pending') return; // 只有在 resolved 或 rejected 时才执行回调

    this.handlers.forEach(handler => {
      if (this.state === 'fulfilled') {
        return handler.onSuccess(this.value);
      } else {
        return handler.onFail(this.value);
      }
    });
    this.handlers = []; // 清空回调队列
  }

  then(onSuccess, onFail) {
    return new SimplePromise((resolve, reject) => {
      this.handlers.push({
        onSuccess: function (value) {
          if (!onSuccess) {
            resolve(value);
          } else {
            try {
              resolve(onSuccess(value));
            } catch (err) {
              reject(err);
            }
          }
        },
        onFail: function (value) {
          if (!onFail) {
            reject(value);
          } else {
            try {
              reject(onFail(value));
            } catch (err) {
              reject(err);
            }
          }
        }
      });

      this.executeHandlers();
    });
  }

  catch(onFail) {
    return this.then(null, onFail);
  }
}