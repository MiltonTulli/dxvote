import styled from 'styled-components';
import { transparentize } from 'polished';
import Link from '../../common/Link';
// import { Button } from '../common/Button';

const InfoCard = styled.button`
  background-color: ${({ theme }) =>
    theme.backgroundColor};
  outline: none;
  border-radius: 32px;
  width: 100% !important;
  : 0 4px 8px 0 ${({ theme, clickable }) =>
    clickable ? transparentize(0.95, theme.shadowColor) : 'none'};
  &:focus {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.royalBlue};
  }
  border: ${({ active, theme }) =>
    active ? `2px solid ${theme.black}` : `1px solid$ ${theme.black}`};

margin-bottom: 8px;
`;


const OptionCard = styled(InfoCard)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 24px;
`;

const OptionCardLeft = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  justify-content: center;
  height: 100%;
`;

const OptionCardClickable = styled(OptionCard)`
  margin-top: 0;
  &:hover {
    cursor: ${({ clickable }) => (clickable ? 'pointer' : '')};
  }
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
`;

const GreenCircle = styled.div`
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

const CircleWrapper = styled.div`
  color: ${({ theme }) => theme.connectedGreen};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  color: ${props =>
    props.color === 'blue'
      ? ({ theme }) => theme.royalBlue
      : ({ theme }) => theme.textColor};
font-weight: 500;
font-size: 14px;
line-height: 20px;
`;
const IconWrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '24px')};
    width: ${({ size }) => (size ? size + 'px' : '24px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `};
`;

export default function Option({
  link = null,
  clickable = true,
  size = 24,
  onClick = null,
  color,
  icon,
  header,
  active = false,
}) {
  const content = (
    <OptionCardClickable
      onClick={onClick}
      clickable={clickable && !active}
      active={active}
    >
      <OptionCardLeft>
        <HeaderText color={color}>
          {active ? (
            <CircleWrapper>
              <GreenCircle/>
            </CircleWrapper>
          ) : (
            ''
          )}
          {header}
        </HeaderText>
      </OptionCardLeft>
      <IconWrapper size={size} active={active}>
        {icon && <img src={icon} alt={'Icon'} />}
      </IconWrapper>
    </OptionCardClickable>
  );
  if (link) {
    return <Link href={link}>{content}</Link>;
  }

  return content;
}
