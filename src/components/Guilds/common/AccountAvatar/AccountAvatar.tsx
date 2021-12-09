import { useMemo } from 'react';
import Avatar from '../../Avatar';
import useENSAvatar from '../../../../hooks/Guilds/ens/useENSAvatar';
import { useContext } from '../../../../contexts';

const AccountAvatar: React.FC = () => {
  const {
    context: { providerStore },
  } = useContext();
  const { account } = providerStore.getActiveWeb3React();
  const { ensName, imageUrl, avatarUri } = useENSAvatar(account);

  let imageUrlToUse = useMemo(() => {
    if (avatarUri) {
      return (
        imageUrl || `https://metadata.ens.domains/mainnet/avatar/${ensName}`
      );
    } else {
      return null;
    }
  }, [imageUrl, ensName, avatarUri]);

  return <Avatar src={imageUrlToUse} defaultSeed={account} size={24} />;
};

export default AccountAvatar;
