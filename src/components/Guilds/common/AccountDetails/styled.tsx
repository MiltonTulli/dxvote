import styled, { css } from 'styled-components';
import { Button } from '../Button';
import Link from '../../../common/Link';

export const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 10px;
  margin: 24px;
  padding: 14px 20px;
`;

export const Address = styled.h4`
  color: var(--turquois-text);
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
  display: flex;
  width: fit-content;
  margin-top: 0;
  margin-bottom: 16px;
`;

export const GreenCircle = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  justify-content: center;
  align-items: center;

  &:first-child {
    height: 8px;
    width: 8px;
    margin-right: 8px;
    background-color: ${({ theme }) => theme.connectedGreen};
    border-radius: 50%;
  }
`;

export const ConnectionText = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
  display: flex;
  align-items: center;
`;

export const AvatarWrapper = styled.div`
  margin-right: 8px;
`;

const baseActionStyles = css`
  color: ${({ theme }) => theme.silverGray};
  text-decoration: none;
  display: flex;
  margin-right: 12px;
  :hover,
  :active,
  :focus {
    cursor: pointer;
    text-decoration: none;
    color: ${({ theme }) => theme.doveGray};
  }
`;
export const CopyAddress = styled.div`
  ${baseActionStyles}
`;

export const ViewAddress = styled(Link)`
  display: flex;
  ${baseActionStyles}
`;

export const CopyIconWrapper = styled.div`
  margin-right: 8px;
`;

export const Label = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
`;

export const ActionsWrapper = styled.div`
  display: flex;
`;

export const ConnectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const ChangeConnection = styled(Button)`
  font-size: 12px;
  margin: 0;
`;
