export default class EventEmitter {
  /**
   * @constructor
   */
  constructor() {
    // 登録する [イベント名, Set(リスナー関数)] を管理するMap
    this.listenersMap = new Map();
  }

  /**
   * 指定したイベントが実行されたときに呼び出されるリスナー関数を登録する
   *
   * @param {String} eventType イベント名
   * @param {Function} listener イベントリスナー
   */
  addEventListener(eventType, listener) {
    // 指定したイベントに対応するSetを作成しリスナー関数を登録する
    if (!this.listenersMap.has(eventType)) {
      this.listenersMap.set(eventType, new Set());
    }
    const listenerSet = this.listenersMap.get(eventType);
    listenerSet.add(listener);
  }

  /**
   * 登録済みのイベントから指定したものをディスパッチする
   *
   * @param {String} eventType イベント名
   */
  emit(eventType) {
    // 指定したイベントに対応するSetを取り出し、すべてのリスナー関数を呼び出す
    const listenerSet = this.listenersMap.get(eventType);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach(listener => {
      listener.call(this);
    });
  }

  /**
   * 指定したイベントのイベントリスナーを解除する
   *
   * @param {String} eventType イベント名
   * @param {Function} listener イベントリスナー
   */
  removeEventLister(eventType, listener) {
    // 指定したイベントに対応するSetを取り出し、該当するリスナー関数を削除する
    const listenerSet = this.listeners.get(eventType);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach(ownListener => {
      if (ownListener === listener) {
        listenerSet.delete(listener);
      }
    });
  }
}
