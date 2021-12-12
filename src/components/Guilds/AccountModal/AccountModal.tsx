import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { observer } from 'mobx-react';
import { FaArrowLeft } from 'react-icons/fa';

import Modal from '../common/Modal';
import AccountDetails from '../common/AccountDetails';
import WalletProviderButton from '../WalletProviderButton'; 
import { usePrevious } from 'utils';
// import Link from '../../../components/common/Link';
import { injected, getWallets } from 'provider/connectors';
import { useContext } from '../../../contexts';
import { isChainIdSupported } from '../../../provider/connectors';
import { useRpcUrls } from 'provider/providerHooks';
import { useWeb3React } from '@web3-react/core';

const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 10px;
`;

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1.5rem 1.5rem;
  font-weight: 500;
  color: var(--header-text);
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`;

const ContentWrapper = styled.div`
  background-color: var(--panel-background);
  color: var(--body-text);
  padding: 2rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`};
`;

const UpperSection = styled.div`
  position: relative;
  background-color: var(--panel-background);

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`;

const OptionGrid = styled.div`
`;

const HoverText = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
  ERROR: 'error',
};

const AccountModal = observer(() => {
  const {
    context: { modalStore },
  } = useContext();
  const { active, connector, error, activate, account, chainId } =
    useWeb3React();
  const rpcUrls = useRpcUrls();
  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);
  const [connectionErrorMessage, setConnectionErrorMessage] = useState(false);
  const walletModalOpen = modalStore.accountModalVisible;

  const toggleAccountModal = () => {
    console.log('toggleAccountModal');
    modalStore.toggleAccountModal();
  };

  // always reset to account view
  useEffect(() => {
    if (walletModalOpen) {
      setConnectionErrorMessage(false);
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [walletModalOpen]);

  // close modal when a connection is successful
  const activePrevious = usePrevious(active);
  const connectorPrevious = usePrevious(connector);
  useEffect(() => {
    if (
      walletModalOpen &&
      ((active && !activePrevious) ||
        (connector && connector !== connectorPrevious && !error))
    ) {
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [
    setWalletView,
    active,
    error,
    connector,
    walletModalOpen,
    activePrevious,
    connectorPrevious,
  ]);

  const tryActivation = async connector => {
    setWalletView(WALLET_VIEWS.PENDING);
    activate(connector, undefined, true).catch(e => {
      setConnectionErrorMessage(e); 
      console.debug('[Activation Error]', e);
      setWalletView(WALLET_VIEWS.ERROR);
    });
  };


  const getActiveWalletProviderName = () => {

  // TODO: check why i get 'injected' and if there is a better way of doing this
   if(window.ethereum?.isMetaMask) return 'MetaMask';
   const wallets = getWallets(rpcUrls)
   return Object.keys(wallets).reduce((acc, wallet) => wallets[wallet]?.active ? wallets[wallet]?.name : acc ) ?? '';
  }

  // const activeprovider = getActiveWalletProviderName();
  // console.log()

  //   get wallets user can switch too, depending on device/browser
  function getOptions() {
    if (!rpcUrls) return [];

    const isMetamask = window.ethereum && window.ethereum.isMetaMask;
    const wallets = getWallets(rpcUrls);
    return Object.keys(wallets).map(key => {
      const option = wallets[key];
      console.log('option', option);
      //   check for mobile options
      if (isMobile) {
        if (!window.ethereum && option.mobile) {
          return (
            <WalletProviderButton
              onClick={() => {
                option.connector !== connector &&
                  !option.href &&
                  tryActivation(option.connector);
              }}
              key={key}
              icon={option.icon}
              active={option.connector && option.connector === connector}
              color={option.color}
              link={option.href}
              header={option.name}
            />
          );
        }
        return null;
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!window.ethereum) {
          if (option.name === 'MetaMask') {
            return (
              <WalletProviderButton
                key={key}
                color={'#E8831D'}
                icon={option.icon}
                header={'Install Metamask'}
                link={'https://metamask.io/'}
              />
            );
          } else {
            return null; //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null;
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null;
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <WalletProviderButton
            onClick={() => {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector);
            }}
            key={key}
            active={option.connector === connector}
            color={option.color}
            icon={option.icon}
            link={option.href}
            header={option.name}
          />
        )
      );
    });
  }

  function getModalContent() {
    if (connectionErrorMessage) {
      return (
        <UpperSection>
          <HeaderRow>
            {connectionErrorMessage
              .toString()
              .indexOf('UnsupportedChainIdError') >= 0
              ? 'Wrong Network'
              : 'Error connecting'}
          </HeaderRow>
          <ContentWrapper>
            {connectionErrorMessage
              .toString()
              .indexOf('UnsupportedChainIdError') >= 0 ? (
              <h5> Please connect to a valid ethereum network. </h5>
            ) : (
              'Error connecting. Try refreshing the page.'
            )}
          </ContentWrapper>
        </UpperSection>
      );
    }
    if (
      account &&
      !isChainIdSupported(chainId) &&
      walletView === WALLET_VIEWS.ACCOUNT
    ) {
      return (
        <UpperSection>
          <HeaderRow>{'Wrong Network'}</HeaderRow>
          <ContentWrapper>
            <h5>Please connect to a valid ethereum network.</h5>
          </ContentWrapper>
        </UpperSection>
      );
    }
    if (account && walletView === WALLET_VIEWS.ACCOUNT) {
      return (
        <AccountDetails
          onConnectionChangeClick={() => setWalletView(WALLET_VIEWS.OPTIONS)}
          providerName={getActiveWalletProviderName()}
        />
      );
    }
    console.log('walletView', walletView);
    return (
      <UpperSection>
        <ContentWrapper>
          <OptionGrid>{getOptions()}</OptionGrid>
        </ContentWrapper>
      </UpperSection>
    );
  }

  const Header = (
    <div>
      {walletView !== WALLET_VIEWS.ACCOUNT ? (
        <HoverText
          onClick={() => {
            setWalletView(WALLET_VIEWS.ACCOUNT);
            setConnectionErrorMessage(null);
          }}
        >
          <FaArrowLeft/>
        </HoverText>
      ) : walletView === WALLET_VIEWS.ACCOUNT ? (
        'Account'
      ) : (
        'Connect to a wallet'
      )}
    </div>
  );

  return (
    <Modal
      header={Header}
      isOpen={walletModalOpen}
      onDismiss={toggleAccountModal}
      fullScreen
    >
      <Wrapper>{getModalContent()}</Wrapper>
    </Modal>
  );
});

export default AccountModal;
