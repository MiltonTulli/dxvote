import styled from 'styled-components';
import Copy from './Copy';
import { getBlockchainLink, getENSName, getERC20Token, getDxVoteContract, toAddressStub} from 'utils';
import { useContext } from '../../contexts';
import { FiExternalLink } from 'react-icons/fi';
import { useEffect, useState } from 'react';

const AddressLink = styled.div`
  display: flex;
  flex-direction: row;
  a {
    color: inherit;
  }
`;

const Icon = styled.img`
  width: 15px;
  height: 15px;
`;

export const BlockchainLink = ({
  text,
  size = 'default',
  type = 'default',
  toCopy = false,
  onlyIcon = false,
}) => {
  const {
    context: { configStore },
  } = useContext();

  // 'feriefernie.eth', 
  const testText = ['0xd8b42c9d76be8b3dd52145e166a1b3f8e60a64b3']
  text = testText[0];

  const networkName = configStore.getActiveChainName();

  const [ensName, setENSName] = useState(''); 
  const erc20Token = getERC20Token(text);
  const dxVoteContract = getDxVoteContract(text)
  
  useEffect(() => {
    async function getENS() {
      const response = await getENSName(text);
      setENSName(response);
    }
    getENS();
  }, [])
  
  
  let formatedAddress;
  if (!ensName && !dxVoteContract && !erc20Token) {
    if (onlyIcon) formatedAddress = <FiExternalLink />
    else formatedAddress = toAddressStub(text, size)
  }
  
  /*
  If the address is an ens domain show the ens domain name with a link to the blockchain explorer address and option to copy the address.
  If the address is an ERC20 token registered in the config show the token symbol instead with links to the token explorer, and the option to copy the token address.
  If the address is an known dxvote contract (avatar,controller, etc) domain show the contract name with a link to the blockchain explorer address and option to copy the address.
  else show formatted address
  */

  return (
    <AddressLink>
      <a href={getBlockchainLink(text, networkName, type)} target="_blank">
        {ensName}
        {!ensName && erc20Token && <Icon src={erc20Token.logoURI} />}
        {!ensName && dxVoteContract && dxVoteContract?.contract}
        {formatedAddress}
      </a>
      {toCopy ? <Copy toCopy={text} /> : <div />}
    </AddressLink>
  );
};

export default BlockchainLink;



