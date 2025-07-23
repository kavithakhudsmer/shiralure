import React, { useState } from 'react';
import { FaCheck } from "react-icons/fa";

const Site = () => {
  const [formData, setFormData] = useState({
    dateFormat: '',
    timeFormat: '',
    defaultTimezone: '',
    defaultLanguage: '',
    defaultSmsGateway: '',
    copyright: '',
    androidAppLink: '',
    iosAppLink: '',
    nonPurchaseProductMaxQuantity: '',
    digitAfterDecimalPoint: '',
    defaultCurrency: '',
    currencyPosition: 'left',
    cashOnDelivery: 'enable',
    isReturnPriceAddToCredit: 'yes',
    onlinePaymentGateway: 'enable',
    languageSwitch: 'enable',
    emailVerification: 'enable',
    phoneVerification: 'enable',
    appDebug: 'enable',
    autoUpdate: 'enable'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving site settings:', formData);
    // Handle save logic here
  };

  return (
    <div className="site-settings-container22">
      <h1 className="site-settings-title22">SITE</h1>
      
      <div className="site-settings-form22">
        <div className="site-settings-row22">
          <div className="site-settings-field22">
            <label className="site-settings-label22">
              DATE FORMAT <span className="site-settings-required22">*</span>
            </label>
            <input
              type="text"
              name="dateFormat"
              value={formData.dateFormat}
              onChange={handleInputChange}
              className="site-settings-input22"
            />
          </div>
          <div className="site-settings-field22">
            <label className="site-settings-label22">
              TIME FORMAT <span className="site-settings-required22">*</span>
            </label>
            <input
              type="text"
              name="timeFormat"
              value={formData.timeFormat}
              onChange={handleInputChange}
              className="site-settings-input22"
            />
          </div>
        </div>

        <div className="site-settings-row22">
          <div className="site-settings-field22">
            <label className="site-settings-label22">
              DEFAULT TIMEZONE <span className="site-settings-required22">*</span>
            </label>
            <input
              type="text"
              name="defaultTimezone"
              value={formData.defaultTimezone}
              onChange={handleInputChange}
              className="site-settings-input22"
            />
          </div>
          <div className="site-settings-field22">
            <label className="site-settings-label22">
              DEFAULT LANGUAGE <span className="site-settings-required22">*</span>
            </label>
            <input
              type="text"
              name="defaultLanguage"
              value={formData.defaultLanguage}
              onChange={handleInputChange}
              className="site-settings-input22"
            />
          </div>
        </div>

        <div className="site-settings-row22">
          <div className="site-settings-field22">
            <label className="site-settings-label22">DEFAULT SMS GATEWAY</label>
            <input
              type="text"
              name="defaultSmsGateway"
              value={formData.defaultSmsGateway}
              onChange={handleInputChange}
              className="site-settings-input22"
            />
          </div>
          <div className="site-settings-field22">
            <label className="site-settings-label22">
              COPYRIGHT <span className="site-settings-required22">*</span>
            </label>
            <input
              type="text"
              name="copyright"
              value={formData.copyright}
              onChange={handleInputChange}
              className="site-settings-input22"
            />
          </div>
        </div>

        <div className="site-settings-row22">
          <div className="site-settings-field22">
            <label className="site-settings-label22">ANDROID APP LINK</label>
            <input
              type="text"
              name="androidAppLink"
              value={formData.androidAppLink}
              onChange={handleInputChange}
              className="site-settings-input22"
            />
          </div>
          <div className="site-settings-field22">
            <label className="site-settings-label22">IOS APP LINK</label>
            <input
              type="text"
              name="iosAppLink"
              value={formData.iosAppLink}
              onChange={handleInputChange}
              className="site-settings-input22"
            />
          </div>
        </div>

        <div className="site-settings-row22">
          <div className="site-settings-field22">
            <label className="site-settings-label22">
              NON PURCHASE PRODUCT MAXIMUM QUANTITY <span className="site-settings-required22">*</span>
            </label>
            <input
              type="text"
              name="nonPurchaseProductMaxQuantity"
              value={formData.nonPurchaseProductMaxQuantity}
              onChange={handleInputChange}
              className="site-settings-input22"
            />
          </div>
          <div className="site-settings-field22">
            <label className="site-settings-label22">
              DIGIT AFTER DECIMAL POINT (EX:0.00) <span className="site-settings-required22">*</span>
            </label>
            <input
              type="text"
              name="digitAfterDecimalPoint"
              value={formData.digitAfterDecimalPoint}
              onChange={handleInputChange}
              className="site-settings-input22"
            />
          </div>
        </div>

        <div className="site-settings-row22">
          <div className="site-settings-field22">
            <label className="site-settings-label22">
              DEFAULT CURRENCY <span className="site-settings-required22">*</span>
            </label>
            <input
              type="text"
              name="defaultCurrency"
              value={formData.defaultCurrency}
              onChange={handleInputChange}
              className="site-settings-input22"
            />
          </div>
          <div className="site-settings-field22">
            <label className="site-settings-label22">
              CURRENCY POSITION <span className="site-settings-required22">*</span>
            </label>
            <div className="site-settings-radio-group22">
              <label className="site-settings-radio-label22">
                <input
                  type="radio"
                  name="currencyPosition"
                  value="left"
                  checked={formData.currencyPosition === 'left'}
                  onChange={(e) => handleRadioChange('currencyPosition', e.target.value)}
                  className="site-settings-radio22"
                />
                Left
              </label>
              <label className="site-settings-radio-label22">
                <input
                  type="radio"
                  name="currencyPosition"
                  value="right"
                  checked={formData.currencyPosition === 'right'}
                  onChange={(e) => handleRadioChange('currencyPosition', e.target.value)}
                  className="site-settings-radio22"
                />
                Right
              </label>
            </div>
          </div>
        </div>

        <div className="site-settings-row22">
          <div className="site-settings-field22">
            <label className="site-settings-label22">
              CASH ON DELIVERY <span className="site-settings-required22">*</span>
            </label>
            <div className="site-settings-radio-group22">
              <label className="site-settings-radio-label22">
                <input
                  type="radio"
                  name="cashOnDelivery"
                  value="enable"
                  checked={formData.cashOnDelivery === 'enable'}
                  onChange={(e) => handleRadioChange('cashOnDelivery', e.target.value)}
                  className="site-settings-radio22"
                />
                Enable
              </label>
              <label className="site-settings-radio-label22">
                <input
                  type="radio"
                  name="cashOnDelivery"
                  value="disable"
                  checked={formData.cashOnDelivery === 'disable'}
                  onChange={(e) => handleRadioChange('cashOnDelivery', e.target.value)}
                  className="site-settings-radio22"
                />
                Disable
              </label>
            </div>
          </div>
          <div className="site-settings-field22">
            <label className="site-settings-label22">
              IS RETURN PRICE ADD TO CREDIT <span className="site-settings-required22">*</span>
            </label>
            <div className="site-settings-radio-group22">
              <label className="site-settings-radio-label22">
                <input
                  type="radio"
                  name="isReturnPriceAddToCredit"
                  value="yes"
                  checked={formData.isReturnPriceAddToCredit === 'yes'}
                  onChange={(e) => handleRadioChange('isReturnPriceAddToCredit', e.target.value)}
                  className="site-settings-radio22"
                />
                Yes
              </label>
              <label className="site-settings-radio-label22">
                <input
                  type="radio"
                  name="isReturnPriceAddToCredit"
                  value="no"
                  checked={formData.isReturnPriceAddToCredit === 'no'}
                  onChange={(e) => handleRadioChange('isReturnPriceAddToCredit', e.target.value)}
                  className="site-settings-radio22"
                />
                No
              </label>
            </div>
          </div>
        </div>

        <div className="site-settings-row22">
          <div className="site-settings-field22">
            <label className="site-settings-label22">
              ONLINE PAYMENT GATEWAY <span className="site-settings-required22">*</span>
            </label>
            <div className="site-settings-radio-group22">
              <label className="site-settings-radio-label22">
                <input
                  type="radio"
                  name="onlinePaymentGateway"
                  value="enable"
                  checked={formData.onlinePaymentGateway === 'enable'}
                  onChange={(e) => handleRadioChange('onlinePaymentGateway', e.target.value)}
                  className="site-settings-radio22"
                />
                Enable
              </label>
              <label className="site-settings-radio-label22">
                <input
                  type="radio"
                  name="onlinePaymentGateway"
                  value="disable"
                  checked={formData.onlinePaymentGateway === 'disable'}
                  onChange={(e) => handleRadioChange('onlinePaymentGateway', e.target.value)}
                  className="site-settings-radio22"
                />
                Disable
              </label>
            </div>
          </div>
          <div className="site-settings-field22">
            <label className="site-settings-label22">
              LANGUAGE SWITCH <span className="site-settings-required22">*</span>
            </label>
            <div className="site-settings-radio-group22">
              <label className="site-settings-radio-label22">
                <input
                  type="radio"
                  name="languageSwitch"
                  value="enable"
                  checked={formData.languageSwitch === 'enable'}
                  onChange={(e) => handleRadioChange('languageSwitch', e.target.value)}
                  className="site-settings-radio22"
                />
                Enable
              </label>
              <label className="site-settings-radio-label22">
                <input
                  type="radio"
                  name="languageSwitch"
                  value="disable"
                  checked={formData.languageSwitch === 'disable'}
                  onChange={(e) => handleRadioChange('languageSwitch', e.target.value)}
                  className="site-settings-radio22"
                />
                Disable
              </label>
            </div>
          </div>
        </div>

        <div className="site-settings-row22">
          <div className="site-settings-field22">
            <label className="site-settings-label22">
              EMAIL VERIFICATION <span className="site-settings-required22">*</span>
            </label>
            <div className="site-settings-radio-group22">
              <label className="site-settings-radio-label22">
                <input
                  type="radio"
                  name="emailVerification"
                  value="enable"
                  checked={formData.emailVerification === 'enable'}
                  onChange={(e) => handleRadioChange('emailVerification', e.target.value)}
                  className="site-settings-radio22"
                />
                Enable
              </label>
              <label className="site-settings-radio-label22">
                <input
                  type="radio"
                  name="emailVerification"
                  value="disable"
                  checked={formData.emailVerification === 'disable'}
                  onChange={(e) => handleRadioChange('emailVerification', e.target.value)}
                  className="site-settings-radio22"
                />
                Disable
              </label>
            </div>
          </div>
          <div className="site-settings-field22">
            <label className="site-settings-label22">
              PHONE VERIFICATION <span className="site-settings-required22">*</span>
            </label>
            <div className="site-settings-radio-group22">
              <label className="site-settings-radio-label22">
                <input
                  type="radio"
                  name="phoneVerification"
                  value="enable"
                  checked={formData.phoneVerification === 'enable'}
                  onChange={(e) => handleRadioChange('phoneVerification', e.target.value)}
                  className="site-settings-radio22"
                />
                Enable
              </label>
              <label className="site-settings-radio-label22">
                <input
                  type="radio"
                  name="phoneVerification"
                  value="disable"
                  checked={formData.phoneVerification === 'disable'}
                  onChange={(e) => handleRadioChange('phoneVerification', e.target.value)}
                  className="site-settings-radio22"
                />
                Disable
              </label>
            </div>
          </div>
        </div>

        <div className="site-settings-row22">
          <div className="site-settings-field22">
            <label className="site-settings-label22">
              APP DEBUG <span className="site-settings-required22">*</span>
            </label>
            <div className="site-settings-radio-group22">
              <label className="site-settings-radio-label22">
                <input
                  type="radio"
                  name="appDebug"
                  value="enable"
                  checked={formData.appDebug === 'enable'}
                  onChange={(e) => handleRadioChange('appDebug', e.target.value)}
                  className="site-settings-radio22"
                />
                Enable
              </label>
              <label className="site-settings-radio-label22">
                <input
                  type="radio"
                  name="appDebug"
                  value="disable"
                  checked={formData.appDebug === 'disable'}
                  onChange={(e) => handleRadioChange('appDebug', e.target.value)}
                  className="site-settings-radio22"
                />
                Disable
              </label>
            </div>
          </div>
          <div className="site-settings-field22">
            <label className="site-settings-label22">
              AUTO UPDATE <span className="site-settings-required22">*</span>
            </label>
            <div className="site-settings-radio-group22">
              <label className="site-settings-radio-label22">
                <input
                  type="radio"
                  name="autoUpdate"
                  value="enable"
                  checked={formData.autoUpdate === 'enable'}
                  onChange={(e) => handleRadioChange('autoUpdate', e.target.value)}
                  className="site-settings-radio22"
                />
                Enable
              </label>
              <label className="site-settings-radio-label22">
                <input
                  type="radio"
                  name="autoUpdate"
                  value="disable"
                  checked={formData.autoUpdate === 'disable'}
                  onChange={(e) => handleRadioChange('autoUpdate', e.target.value)}
                  className="site-settings-radio22"
                />
                Disable
              </label>
            </div>
          </div>
        </div>

        <div className="site-settings-save-section22">
          <button className="site-settings-save-btn22" onClick={handleSave}>
            <FaCheck size={16} />
            SAVE
          </button>
        </div>
      </div>

      <style jsx>{`
        .site-settings-container22 {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
          background-color: #ffffff;
          min-height: 100vh;
          font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .site-settings-title22 {
          font-size: 24px;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 30px 0;
          text-align: left;
        }

        .site-settings-form22 {
          display: flex;
          flex-direction: column;
        }

        .site-settings-row22 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        .site-settings-field22 {
          display: flex;
          flex-direction: column;
        }

        .site-settings-label22 {
          font-size: 12px;
          font-weight: 500;
          color: #6b7280;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .site-settings-required22 {
          color: #ef4444;
        }

        .site-settings-input22 {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          background-color: white;
          transition: border-color 0.2s;
        }

        .site-settings-input22:focus {
          outline: none;
          border-color: #5A66F1;
        }

        .site-settings-radio-group22 {
          display: flex;
          gap: 20px;
          margin-top: 8px;
        }

        .site-settings-radio-label22 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
        }

        .site-settings-radio22 {
          width: 16px;
          height: 16px;
          accent-color: #5A66F1;
          cursor: pointer;
        }

        .site-settings-save-section22 {
          margin-top: 32px;
          display: flex;
          justify-content: flex-start;
        }

        .site-settings-save-btn22 {
          background: #5A66F1;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.2s;
        }

        .site-settings-save-btn22:hover {
          background: #5A66F1;
        }

        @media (max-width: 768px) {
          .site-settings-container22 {
            padding: 16px;
          }
          
          .site-settings-row22 {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Site;