import styled from 'styled-components';
import { Colors } from './colors.js';

const DEFAULT_SIZE = 6;
const CustomComponentSymbol = styled.div.withConfig({
  displayName: "CustomComponentSymbol",
  componentId: "sc-1b4wdw-0"
})(["width:", "px;height:", "px;background:", ";transform:rotate(45deg);"], p => p.size ?? DEFAULT_SIZE, p => p.size ?? DEFAULT_SIZE, Colors.purple);

export { CustomComponentSymbol };
