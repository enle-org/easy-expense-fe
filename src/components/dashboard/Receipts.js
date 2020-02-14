/* eslint-disable react/no-unused-state */
import React from 'react';
import Nav from './Nav';

const tableOverflow = {
  overflowX: 'auto',
};

const Receipts = () => (
  <div className="accountWrapper">
    <Nav />
    <main id="receipts" className="accountWrapper__main">
      <div className="u_section head">
        <h2 className="pageTitle">Receipts</h2>
        <div className="button-wrapper">
          <button type="button" className="button button__primary button-main">
            Upload Receipt
          </button>
        </div>
      </div>
      <div className="body">
        <div className="tab-buttons">
          <button className="active" type="button">All Receipts</button>
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
              <tr>
                <td>
                  <img src="/icons/checkmark.svg" alt="" />
                </td>
                <td>Delta Airlines.pdf</td>
                <td>11 November 2019</td>
                <td>
                  <button type="button">
                    <img src="/icons/delete.svg" alt="" />
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/icons/question_mark.svg" alt="" />
                </td>
                <td>Airbnb_1 bedroom apartment in do...pdf</td>
                <td>11 November 2019</td>
                <td>
                  <button type="button">
                    <img src="/icons/delete.svg" alt="" />
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/icons/checkmark.svg" alt="" />
                </td>
                <td>Uber_LAX - 98210.pdf</td>
                <td>11 November 2019</td>
                <td>
                  <button type="button">
                    <img src="/icons/delete.svg" alt="" />
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/icons/question_mark.svg" alt="" />
                </td>
                <td>Apple.pdf</td>
                <td>11 November 2019</td>
                <td>
                  <button type="button">
                    <img src="/icons/delete.svg" alt="" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
);

export default Receipts;
