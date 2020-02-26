import React from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import moment from 'moment';
import Modal from 'react-modal';

import Nav from './Nav';
import config from '../../../config';
import CustomStyles from '../common/commonStyles';

import { decodeToken } from '../../utils/serverAuth';

const tableOverflow = {
  overflowX: 'auto',
};

@inject('receiptStore')
@observer
class Receipts extends React.Component {
  state = {
    isModalOpen: false,
    itemToDelete: '',
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  openDeleteModal = id => {
    this.setState({
      isModalOpen: true,
      itemToDelete: id,
    });
  };

  openWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: config.CLOUDINARY_CLOUDNAME,
        uploadPreset: config.UNSIGNED_UPLOAD_PRESET,
        folder: 'easy-expense',
      },
      (error, result) => {
        this.handleImageUpload(result);
      },
    );
    widget.open();
  };

  handleImageUpload = result => {
    if (result.event === 'success') {
      this.props.receiptStore.setClassProps(
        [
          {
            name: 'title',
            value: result.info.original_filename,
          },
          {
            name: 'image',
            value: result.info.secure_url,
          },
          {
            name: 'userId',
            value: decodeToken().sub,
          },
        ],
        this.props.receiptStore.receiptData,
      );
      this.props.receiptStore.receiptUpload();
    }
  };

  handleReceiptDelete = () => {
    const { itemToDelete } = this.state;
    this.props.receiptStore.deleteReceipt(itemToDelete);
    this.closeModal();
  };

  renderImage = receipt => {
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('img01');
    modal.style.display = 'block';
    modalImg.src = receipt.images;
    modalImg.alt = receipt.title;

    const span = document.getElementsByClassName('close')[0];
    span.onclick = () => {
      modal.style.display = 'none';
    };
  };

  render() {
    this.props.receiptStore.getAllReceipts();
    const receipts = toJS(this.props.receiptStore.receipts);
    Modal.setAppElement('body');
    // console.log(decodeToken());

    const { isModalOpen } = this.state;

    return (
      <div className="accountWrapper">
        <Nav />
        <main id="receipts" className="accountWrapper__main">
          <div className="u_section head">
            <h2 className="pageTitle">Receipts</h2>
            <div className="button-wrapper">
              <button
                type="button"
                className="button button__primary button-main"
                onClick={this.openWidget}
              >
                Upload Receipt
              </button>
            </div>
          </div>
          <div className="body">
            <div className="tab-buttons">
              <button type="button" className="active">
                All Receipts
              </button>
              <button type="button">Unreported Receipts</button>
              <button type="button">Reported Receipts</button>
            </div>
            <div className="receipts-table" style={{ tableOverflow }}>
              <table>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Receipt Name</th>
                    <th>Date Uploaded</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {receipts.length > 0 &&
                    receipts.map(receipt => {
                      return (
                        <tr className="t-row" key={receipt._id}>
                          <td>
                            <button
                              type="button"
                              onClick={() => this.renderImage(receipt)}
                            >
                              <img src="/icons/checkmark.svg" alt="checkmark" />
                            </button>
                            {/* <img src="/icons/question_mark.svg" alt="" /> */}
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => this.renderImage(receipt)}
                            >
                              {receipt.title}
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => this.renderImage(receipt)}
                            >
                              {moment(receipt.createdAt).format('DD MMMM YYYY')}
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => this.openDeleteModal(receipt._id)}
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="24"
                                  height="24"
                                  rx="3"
                                  fill="#E5E5E5"
                                />
                                <g clipPath="url(#clip0)">
                                  <path
                                    d="M6.1189 8.23779H7.53149H18.8323"
                                    stroke="black"
                                    strokeWidth="1.4126"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M9.65039 8.23779V6.8252C9.65039 6.45055 9.79922 6.09125 10.0641 5.82634C10.329 5.56142 10.6883 5.4126 11.063 5.4126H13.8882C14.2628 5.4126 14.6221 5.56142 14.887 5.82634C15.152 6.09125 15.3008 6.45055 15.3008 6.8252V8.23779M17.4197 8.23779V18.126C17.4197 18.5006 17.2709 18.8599 17.0059 19.1248C16.741 19.3897 16.3817 19.5386 16.0071 19.5386H8.94409C8.56945 19.5386 8.21015 19.3897 7.94523 19.1248C7.68032 18.8599 7.53149 18.5006 7.53149 18.126V8.23779H17.4197Z"
                                    stroke="black"
                                    strokeWidth="1.4126"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M11.063 11.7693V16.0071"
                                    stroke="black"
                                    strokeWidth="1.4126"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M13.8882 11.7693V16.0071"
                                    stroke="black"
                                    strokeWidth="1.4126"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0">
                                    <rect
                                      x="4"
                                      y="4"
                                      width="16.9512"
                                      height="16.9512"
                                      fill="white"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        <div id="myModal" className="modal">
          <span className="close">&times;</span>
          <img className="modal-content" alt="receipt" id="img01" />
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={this.closeModal}
          style={CustomStyles.modalStyles}
        >
          <div className="eEPopup eEPopup__active receipts_view">
            <div className="eEPopup__body">
              <div className="close-div">
                <button
                  type="button"
                  className="close"
                  onClick={this.closeModal}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.2545 8.21818C10.1091 8.07273 10.1091 7.85455 10.2545 7.70909L15.7091 2.25455C15.8545 2.10909 15.9273 1.89091 15.9273 1.74545C15.9273 1.6 15.8545 1.38182 15.7091 1.23636L14.6909 0.218182C14.5455 0.0727273 14.3273 0 14.1818 0C13.9636 0 13.8182 0.0727273 13.6727 0.218182L8.21818 5.67273C8.07273 5.81818 7.85455 5.81818 7.70909 5.67273L2.25455 0.218182C2.10909 0.0727273 1.89091 0 1.74545 0C1.6 0 1.38182 0.0727273 1.23636 0.218182L0.218182 1.23636C0.0727273 1.38182 0 1.6 0 1.74545C0 1.89091 0.0727273 2.10909 0.218182 2.25455L5.67273 7.70909C5.81818 7.85455 5.81818 8.07273 5.67273 8.21818L0.218182 13.6727C0.0727273 13.8182 0 14.0364 0 14.1818C0 14.3273 0.0727273 14.5455 0.218182 14.6909L1.23636 15.7091C1.38182 15.8545 1.6 15.9273 1.74545 15.9273C1.89091 15.9273 2.10909 15.8545 2.25455 15.7091L7.70909 10.2545C7.85455 10.1091 8.07273 10.1091 8.21818 10.2545L13.6727 15.7091C13.8182 15.8545 14.0364 15.9273 14.1818 15.9273C14.3273 15.9273 14.5455 15.8545 14.6909 15.7091L15.7091 14.6909C15.8545 14.5455 15.9273 14.3273 15.9273 14.1818C15.9273 14.0364 15.8545 13.8182 15.7091 13.6727L10.2545 8.21818Z"
                      fill="#B3B3B3"
                    />
                  </svg>
                </button>
              </div>
              <div className="content">
                <div className="content__copy">
                  <div className="confirmation__delete-icon-container">
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 64 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64Z"
                        fill="#FB5267"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M23.6483 41V27.1843C22.6085 26.9083 21.9347 25.9038 22.0738 24.8369C22.2131 23.7701 23.1219 22.9722 24.1979 22.9719H27.0688V22.271C27.0656 21.6816 27.2986 21.1156 27.7159 20.6992C28.1332 20.283 28.7 20.0512 29.2895 20.0561H34.2688C34.8582 20.0512 35.4251 20.283 35.8424 20.6992C36.2596 21.1156 36.4927 21.6816 36.4894 22.271V22.9719H39.3604C40.4363 22.9722 41.3451 23.7701 41.4844 24.8369C41.6235 25.9038 40.9498 26.9083 39.91 27.1843V41C39.91 41.8166 39.6105 42.5834 39.0875 43.1337C38.567 43.6854 37.8424 43.9987 37.0839 44H26.4744C25.716 43.9987 24.9914 43.6854 24.4708 43.1337C23.9477 42.5834 23.6483 41.8166 23.6483 41ZM26.4744 42.8785H37.0839C38.0426 42.8785 38.7885 42.0549 38.7885 41V27.2336H24.7698V41C24.7698 42.0549 25.5156 42.8785 26.4744 42.8785ZM28.1903 22.271C28.1866 21.979 28.3014 21.698 28.5086 21.4919C28.7156 21.2858 28.9973 21.1725 29.2895 21.1775H34.2688C34.561 21.1725 34.8426 21.2858 35.0496 21.4919C35.2569 21.6978 35.3716 21.979 35.3679 22.271V22.9719H28.1903V22.271ZM39.3604 24.0934H24.1979C23.6404 24.0934 23.1885 24.5453 23.1885 25.1028C23.1885 25.6602 23.6404 26.1121 24.1979 26.1121H39.3604C39.9178 26.1121 40.3697 25.6602 40.3697 25.1028C40.3697 24.5453 39.9178 24.0934 39.3604 24.0934Z"
                        fill="white"
                      />
                      <path
                        d="M23.6483 27.1843H23.8983V26.992L23.7124 26.9427L23.6483 27.1843ZM22.0738 24.8369L21.8259 24.8045L21.8259 24.8045L22.0738 24.8369ZM24.1979 22.9719V22.7219H24.1978L24.1979 22.9719ZM27.0688 22.9719V23.2219H27.3188V22.9719H27.0688ZM27.0688 22.271H27.3188L27.3188 22.2696L27.0688 22.271ZM27.7159 20.6992L27.5393 20.5222L27.5393 20.5222L27.7159 20.6992ZM29.2895 20.0561L29.2874 20.3061H29.2895V20.0561ZM34.2688 20.0561V20.3061L34.2708 20.306L34.2688 20.0561ZM35.8424 20.6992L36.0189 20.5222L36.0189 20.5222L35.8424 20.6992ZM36.4894 22.271L36.2394 22.2696V22.271H36.4894ZM36.4894 22.9719H36.2394V23.2219H36.4894V22.9719ZM39.3604 22.9719L39.3604 22.7219H39.3604V22.9719ZM41.4844 24.8369L41.7323 24.8045L41.7323 24.8045L41.4844 24.8369ZM39.91 27.1843L39.8458 26.9427L39.66 26.992V27.1843H39.91ZM39.0875 43.1337L38.9063 42.9614L38.9056 42.9621L39.0875 43.1337ZM37.0839 44V44.25H37.0843L37.0839 44ZM26.4744 44L26.4739 44.25H26.4744V44ZM24.4708 43.1337L24.6526 42.9621L24.652 42.9614L24.4708 43.1337ZM38.7885 27.2336H39.0385V26.9836H38.7885V27.2336ZM24.7698 27.2336V26.9836H24.5198V27.2336H24.7698ZM28.5086 21.4919L28.6849 21.6691L28.685 21.669L28.5086 21.4919ZM28.1903 22.271H28.4404L28.4403 22.2678L28.1903 22.271ZM29.2895 21.1775L29.2852 21.4275H29.2895V21.1775ZM34.2688 21.1775V21.4276L34.2731 21.4275L34.2688 21.1775ZM35.0496 21.4919L34.8732 21.669L34.8734 21.6692L35.0496 21.4919ZM35.3679 22.271L35.1179 22.2678V22.271H35.3679ZM35.3679 22.9719V23.2219H35.6179V22.9719H35.3679ZM28.1903 22.9719H27.9403V23.2219H28.1903V22.9719ZM23.3983 27.1843V41H23.8983V27.1843H23.3983ZM21.8259 24.8045C21.6706 25.996 22.423 27.1178 23.5841 27.426L23.7124 26.9427C22.794 26.6989 22.1988 25.8117 22.3217 24.8692L21.8259 24.8045ZM24.1978 22.7219C22.9963 22.7222 21.9815 23.6133 21.8259 24.8045L22.3217 24.8692C22.4448 23.927 23.2475 23.2221 24.1979 23.2219L24.1978 22.7219ZM27.0688 22.7219H24.1979V23.2219H27.0688V22.7219ZM26.8188 22.271V22.9719H27.3188V22.271H26.8188ZM27.5393 20.5222C27.0747 20.9858 26.8152 21.616 26.8188 22.2724L27.3188 22.2696C27.3159 21.7471 27.5225 21.2453 27.8925 20.8761L27.5393 20.5222ZM29.2915 19.8061C28.6352 19.8007 28.004 20.0587 27.5393 20.5222L27.8924 20.8762C28.2624 20.5072 28.7649 20.3018 29.2874 20.306L29.2915 19.8061ZM34.2688 19.8061H29.2895V20.3061H34.2688V19.8061ZM36.0189 20.5222C35.5543 20.0587 34.9231 19.8007 34.2667 19.8061L34.2708 20.306C34.7933 20.3018 35.2959 20.5072 35.6658 20.8762L36.0189 20.5222ZM36.7394 22.2724C36.7431 21.616 36.4835 20.9858 36.0189 20.5222L35.6658 20.8761C36.0357 21.2453 36.2423 21.7471 36.2394 22.2696L36.7394 22.2724ZM36.7394 22.9719V22.271H36.2394V22.9719H36.7394ZM39.3604 22.7219H36.4894V23.2219H39.3604V22.7219ZM41.7323 24.8045C41.5768 23.6133 40.5619 22.7222 39.3604 22.7219L39.3603 23.2219C40.3107 23.2221 41.1135 23.927 41.2365 24.8692L41.7323 24.8045ZM39.9741 27.426C41.1353 27.1178 41.8877 25.996 41.7323 24.8045L41.2365 24.8692C41.3594 25.8117 40.7642 26.6989 39.8458 26.9427L39.9741 27.426ZM40.16 41V27.1843H39.66V41H40.16ZM39.2687 43.3059C39.8386 42.7064 40.16 41.8767 40.16 41H39.66C39.66 41.7564 39.3825 42.4605 38.9063 42.9614L39.2687 43.3059ZM37.0843 44.25C37.9115 44.2485 38.7017 43.907 39.2693 43.3052L38.9056 42.9621C38.4323 43.4639 37.7733 43.7488 37.0834 43.75L37.0843 44.25ZM26.4744 44.25H37.0839V43.75H26.4744V44.25ZM24.289 43.3052C24.8567 43.9069 25.6469 44.2485 26.4739 44.25L26.4748 43.75C25.7851 43.7488 25.1261 43.4639 24.6526 42.9621L24.289 43.3052ZM23.3983 41C23.3983 41.8767 23.7197 42.7064 24.2896 43.3059L24.652 42.9614C24.1758 42.4605 23.8983 41.7564 23.8983 41H23.3983ZM37.0839 42.6285H26.4744V43.1285H37.0839V42.6285ZM38.5385 41C38.5385 41.9404 37.8821 42.6285 37.0839 42.6285V43.1285C38.2031 43.1285 39.0385 42.1694 39.0385 41H38.5385ZM38.5385 27.2336V41H39.0385V27.2336H38.5385ZM24.7698 27.4836H38.7885V26.9836H24.7698V27.4836ZM25.0198 41V27.2336H24.5198V41H25.0198ZM26.4744 42.6285C25.6761 42.6285 25.0198 41.9404 25.0198 41H24.5198C24.5198 42.1694 25.3551 43.1285 26.4744 43.1285V42.6285ZM28.3323 21.3146C28.0772 21.5684 27.9358 21.9145 27.9404 22.2742L28.4403 22.2678C28.4375 22.0435 28.5256 21.8276 28.6849 21.6691L28.3323 21.3146ZM29.2938 20.9276C28.9342 20.9214 28.5872 21.0608 28.3322 21.3147L28.685 21.669C28.844 21.5107 29.0604 21.4236 29.2852 21.4275L29.2938 20.9276ZM34.2688 20.9275H29.2895V21.4275H34.2688V20.9275ZM35.226 21.3147C34.971 21.0608 34.6241 20.9214 34.2644 20.9276L34.2731 21.4275C34.4978 21.4236 34.7143 21.5107 34.8732 21.669L35.226 21.3147ZM35.6179 22.2742C35.6225 21.9146 35.4811 21.5682 35.2259 21.3145L34.8734 21.6692C35.0326 21.8274 35.1208 22.0434 35.1179 22.2678L35.6179 22.2742ZM35.6179 22.9719V22.271H35.1179V22.9719H35.6179ZM28.1903 23.2219H35.3679V22.7219H28.1903V23.2219ZM27.9403 22.271V22.9719H28.4403V22.271H27.9403ZM24.1979 24.3434H39.3604V23.8434H24.1979V24.3434ZM23.4385 25.1028C23.4385 24.6834 23.7785 24.3434 24.1979 24.3434V23.8434C23.5023 23.8434 22.9385 24.4072 22.9385 25.1028H23.4385ZM24.1979 25.8621C23.7785 25.8621 23.4385 25.5222 23.4385 25.1028H22.9385C22.9385 25.7983 23.5023 26.3621 24.1979 26.3621V25.8621ZM39.3604 25.8621H24.1979V26.3621H39.3604V25.8621ZM40.1197 25.1028C40.1197 25.5222 39.7798 25.8621 39.3604 25.8621V26.3621C40.0559 26.3621 40.6197 25.7983 40.6197 25.1028H40.1197ZM39.3604 24.3434C39.7798 24.3434 40.1197 24.6834 40.1197 25.1028H40.6197C40.6197 24.4072 40.0559 23.8434 39.3604 23.8434V24.3434Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <p>Are you sure you want to delete this receipt?</p>
                </div>
                <div className="buttonWrapper">
                  <button
                    type="button"
                    className="button__primary close-btn"
                    onClick={this.handleReceiptDelete}
                  >
                    Delete Receipt
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Receipts;
