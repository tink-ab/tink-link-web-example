import React from 'react';
import Header from './Header';
import AuthorizationLink from './AuthorizationLink';
import { BasicDropdown } from './BasicDropdown';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      market: 'SE',
      locale: 'en_US',
    };
  }

  onSelectMarket(value) {
    this.setState({market: value});
  }

  onSelectLocale(value) {
    this.setState({locale: value});
  }

  render() {
    const {
      locale,
      market,
    } = this.state;
    return (
      <div>
        <Header text="Hello!" emoji="money" />

        <p>We can help you analyze your financial status.</p>
        <p>
          Or actually we can’t. We’re just a simple example app.
          But you can connect your bank to see your account data, transactions and investments!
        </p>

        <div style={{padding: '50px 0 10px 0'}}>
          <BasicDropdown
            name="Choose a market" items={['AT', 'BE', 'DE', 'DK', 'ES', 'FI', 'GB', 'NO', 'SE']}
            onSelect={(value) => this.onSelectMarket(value)} style={{marginBottom: '30px'}}
          />
        </div>

        <div style={{padding: '10px 0 50px 0'}}>
          <BasicDropdown
            name="Choose a locale" items={['en_US', 'sv_SE', 'da_DK', 'no_NO', 'fi_FI']}
            onSelect={(value) => this.onSelectLocale(value)} style={{marginBottom: '30px'}}
          />
        </div>

        <AuthorizationLink
          scope="accounts:read,transactions:read,investments:read,user:read"
          market={market} locale={locale}
        />
      </div>
    );
  }
}
