import { observable, action, runInAction } from 'mobx';
import { toJS } from 'mobx';

import { setClassProps, runInActionUtil } from '../utils/helpers';
import axiosInstance from '../utils/axiosInstance';
import config from '../../config';

const baseUrl = config.API_URL;

export default class ReceiptStore {
  @observable
  receipts = [];

  @observable
  receiptData = {
    title: '',
    image: '',
    userId: '',
  };

  @observable
  receiptSuccess = {
    visible: false,
    message: '',
  };

  @observable
  receiptErrors = {
    visible: false,
    message: '',
  };

  @observable
  deleteReceiptSuccess = {
    visible: false,
  };

  @action
  receiptUpload = async () => {
    try {
      await axiosInstance.post(`${baseUrl}/receipts`, {
        title: this.receiptData.title,
        images: this.receiptData.image,
        userId: this.receiptData.userId,
      });

      runInAction(() => {
        this.receiptData = {
          title: '',
          image: '',
          userId: '',
        };
        this.receiptSuccess = {
          visible: true,
          message: 'Your receipt was uploaded successfully.',
        };
      });
    } catch (error) {
      runInActionUtil(this, 'receiptErrors', {
        visible: true,
        message: error.response.data.message,
      });
    }
  };

  @action
  getAllReceipts = async () => {
    try {
      const {
        data: { data },
      } = await axiosInstance.get(`${baseUrl}/receipts`);
      runInAction(() => {
        this.receipts = data;
      });
    } catch (error) {
      runInActionUtil(this, 'receiptErrors', {
        visible: true,
        message: error.response.data.message,
      });
    }
  };

  @action
  deleteReceipt = async id => {
    try {
      const receipts = toJS(this.receipts);
      const newReceipts = receipts.filter(receipt => receipt._id !== id);
      await axiosInstance.delete(`${baseUrl}/receipts/${id}`);
      runInAction(() => {
        this.receipts = newReceipts;
        this.deleteReceiptSuccess = {
          visible: true,
        };
      });
    } catch (error) {
      runInActionUtil(this, 'receiptErrors', {
        visible: true,
        message: error.response.data.message,
      });
    }
  };

  @action
  setClassProps = (arr, self = this) => setClassProps(arr, self);
}
