import { makeObservable, observable, action } from 'mobx';
import RootContext from '../contexts';

export default class ModalStore {
  walletModalVisible: boolean;
  networkModalVisible: boolean;
  accountModalVisible: boolean;
  context: RootContext;

  constructor(context) {
    this.context = context;
    this.walletModalVisible = false;
    this.networkModalVisible = false;
    this.accountModalVisible = false;

    makeObservable(this, {
      walletModalVisible: observable,
      toggleWalletModal: action,
      accountModalVisible: observable,
      toggleAccountModal: action,
      setWalletModalVisible: action,
      networkModalVisible: observable,
      toggleNetworkModal: action,
      setNetworkModalVisible: action,
      reset: action,
    });
  }

  reset() {
    this.walletModalVisible = false;
    this.networkModalVisible = false;
  }

  @action toggleWalletModal() {
    this.walletModalVisible = !this.walletModalVisible;
  }

  @action toggleAccountModal() {
    this.accountModalVisible = !this.accountModalVisible;
  }

  @action setWalletModalVisible(visible: boolean) {
    this.walletModalVisible = visible;
  }

  @action toggleNetworkModal() {
    this.networkModalVisible = !this.networkModalVisible;
  }

  @action setNetworkModalVisible(visible: boolean) {
    this.networkModalVisible = visible;
  }
}
