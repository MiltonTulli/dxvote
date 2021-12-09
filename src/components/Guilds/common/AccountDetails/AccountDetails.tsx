import { ReactElement } from 'react';
import { useContext } from '../../../../contexts';
import AccountAvatar from '../AccountAvatar';
import {
  getBlockchainLink,
  shortenAddress,
  useCopyClipboard,
} from '../../../../utils';
import {
  Wrapper,
  Address,
  GreenCircle,
  ConnectionText,
  AvatarWrapper,
  CopyAddress,
  ViewAddress,
  CopyIconWrapper,
  Label,
  ActionsWrapper,
  ConnectionWrapper,
  ChangeConnection,
} from './styled';

import { FiCopy, FiCheckCircle, FiExternalLink } from 'react-icons/fi';

interface AccountDetailsProps {
  onConnectionChangeClick: () => void;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({
  onConnectionChangeClick,
}: AccountDetailsProps): ReactElement => {
  const {
    context: { providerStore, configStore },
  } = useContext();
  const [isCopied, setCopied] = useCopyClipboard();

  const { account } = providerStore.getActiveWeb3React();
  const networkName = configStore.getActiveChainName();

  return (
    <Wrapper>
      <ConnectionWrapper>
        <ConnectionText>
          <GreenCircle /> Connected to Metamask
        </ConnectionText>
        <ChangeConnection onClick={onConnectionChangeClick}>
          Change
        </ChangeConnection>
      </ConnectionWrapper>
      <Address>
        <AvatarWrapper>
          <AccountAvatar />
        </AvatarWrapper>
        {shortenAddress(account)}
      </Address>
      <ActionsWrapper>
        <CopyAddress onClick={() => setCopied(account)}>
          <CopyIconWrapper>
            {isCopied ? <FiCheckCircle /> : <FiCopy />}
          </CopyIconWrapper>
          <Label>Copy Address</Label>
        </CopyAddress>
        <ViewAddress href={getBlockchainLink(account, networkName, 'address')}>
          <CopyIconWrapper>
            <FiExternalLink />
          </CopyIconWrapper>
          <Label>View on Explorer</Label>
        </ViewAddress>
      </ActionsWrapper>
    </Wrapper>
  );
};

export default AccountDetails;
