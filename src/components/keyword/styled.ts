import styled from 'styled-components';

export const colors = {
  colorBlueberry10: '#E0EDFF',
  colorBlueBerry70: '#2B77CC'
};

export const KeywordBubble = styled.div`
  background-color: ${colors.colorBlueberry10};
  border-radius: 4px;
  padding: 0 4px;
  display: inline-flex;
  border: solid;
  border-color: ${colors.colorBlueBerry70};
  align-items: center;
  justify-content: center;
  gap: 4px;
  user-select: none;

  &:focus,
  &:active {
    border: solid #0962c9;
    outline-color: #0962c9;
  }
`;

export const KeywordText = styled.div`
  color: ${colors.colorBlueBerry70};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
`;

export const CloseButton = styled.div`
  display: grid;
  align-items: center;
  background: #9dc3f8;
  padding: 1.5px;
  border-radius: 1px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #7bb0fa;
  }
`;

export const KeywordInputBar = styled.input`
  border-radius: 4px;
  border: solid ${colors.colorBlueBerry70};

  &:focus,
  &:active {
    border: solid #0962c9;
    outline-color: #0962c9;
  }
`;

export const KeywordInputContainer = styled.div`
  display: inline-flex;
  gap: 8px;
`;

export const KeywordsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Expandable = styled.div<{childHeight?: string, expanded?: boolean}>`
  align-items: center;
  /* height: ${(props) => props.childHeight}; */

    transform-origin: center left;
    height:  24px;
    @keyframes open {
      0% {
        transform: scaleX(0);
        max-height: 0px;
      }

      100% {
        transform: scaleX(1);
      }
    }

    @keyframes close {
      0% {
        transform: scaleX(1);
      }

      100% {
        transform: scaleX(0);
        max-height: 0px;
      }
    }

    animation: ${(props) => props.expanded ? 'close' : 'open'} 0.3s ease-in-out;
`;


