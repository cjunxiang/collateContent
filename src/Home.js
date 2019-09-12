import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import emoji from 'node-emoji';

const Input = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;
const EndProduct = styled.div`
  width: 50%;
`;
const TextInputs = styled.div`
  padding: 20px;
`;
const UpButton = styled(Button)`
  left: 20%;
  position: relative;
`;
const ImageInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
`;

const ImagesDiv = styled.div`
  border-style: dotted;
`;

const QRCode = styled.img`
  top: ${({ topPercent }) => topPercent}%;
  right: ${({ rightPercent }) => rightPercent}%;
  position: absolute;
  width: ${({ size }) => size}%;
  z-index: 10;
`;

const FinalPoster = styled.img`
  position: absolute;
  width: 35%;
  z-index: 9;
`;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topPercent: 77,
      rightPercent: 36,
      size: 7
    };
  }
  clearLink = () => {
    this.setState({
      imageLink: '',
      codeLink: ''
    });
  };
  handleLeadInTextUpdate = e => {
    const { value } = e.target;
    this.setState({
      leadInText: value
    });
  };
  openGenerateQR = () => {
    window.open(
      'https://mp.weixin.qq.com/wxamp/index/index?lang=zh_CN&token=1952068681',
      '_blank'
    );
  };
  open247 = () => {
    window.open('http://www.247tickets.com', '_blank');
  };
  shiftUp = () => {
    this.setState({
      topPercent: this.state.topPercent - 3
    });
  };
  shiftDown = () => {
    this.setState({
      topPercent: this.state.topPercent + 3
    });
  };
  shiftRight = () => {
    this.setState({
      rightPercent: this.state.rightPercent - 1
    });
  };
  shiftLeft = () => {
    this.setState({
      rightPercent: this.state.rightPercent + 1
    });
  };
  upSize = () => {
    this.setState({
      size: this.state.size + 0.3
    });
  };

  downSize = () => {
    this.setState({
      size: this.state.size - 0.3
    });
  };
  handleMainTextUpdate = e => {
    const { value } = e.target;
    this.setState({
      mainText: value.trim()
    });
  };
  handlePriceDetailsChange = e => {
    const { value } = e.target;
    this.setState({
      priceDetail: value
    });
  };
  handleLocationUpdate = e => {
    this.setState({
      location: e.target.value.trim()
    });
  };
  handleDateChange = e => {
    this.setState({
      date: e.target.value.trim()
    });
  };

  handlePriceChange = e => {
    this.setState({
      price: e.target.value.trim()
    });
  };
  refreshPicture = e => {
    this.setState({
      imageLink: e.target.value
    });
  };

  refreshCode = e => {
    this.setState({
      codeLink: e.target.value
    });
  };

  refreshOutput = () => {
    const {
      leadInText,
      mainText,
      date,
      location,
      price,
      priceDetail
    } = this.state;

    let result;
    let newPrice;
    if (priceDetail !== undefined) {
      newPrice = price + 'RMB (' + priceDetail + ')';
    } else {
      newPrice = price + 'RMB';
    }
    result =
      mainText +
      '\n' +
      '\n' +
      emoji.get('stopwatch') +
      date +
      '\n' +
      emoji.get('round_pushpin') +
      ' ' +
      location +
      '\n' +
      emoji.get('moneybag') +
      ' ' +
      'From ' +
      newPrice +
      '\n' +
      '\n' +
      emoji.get('camera_with_flash') +
      emoji.get('camera_with_flash') +
      'Extract the QR code to open our mini program and find out more!';

    if (leadInText !== undefined) {
      result = leadInText + '\n\n' + result;
    }

    this.setState({
      output: result
    });
  };

  render() {
    return (
      <div>
        <Input>
          <TextInputs>
            <Button onClick={this.open247} variant='outlined'>
              Let's go to 247Ticket's Website!
            </Button>
            <br />
            <br />
            <div>
              <h> Lead-in Text (Optional) </h>
              <br />
              <TextField
                onChange={this.handleLeadInTextUpdate}
                placeholder='Lead up Text'
                fullWidth
                variant='outlined'
              />
            </div>
            <br />

            <div>
              <h> Main Description </h>
              <br />
              <TextField
                onChange={this.handleMainTextUpdate}
                placeholder='Placeholder'
                multiline
                fullWidth
                variant='outlined'
                rows='6'
              />
            </div>

            <div>
              <br />
              <h> Date (and Time) </h>
              <br />
              <TextField
                placeholder='What date is the event?'
                onChange={this.handleDateChange}
                variant='outlined'
              />
            </div>

            <div>
              <br />
              <h> Place </h>
              <br />
              <TextField
                onChange={this.handleLocationUpdate}
                placeholder='Where is this event?'
                variant='outlined'
              />
            </div>

            <div>
              <br />
              <h> Price and additional details </h>
              <br />
              <TextField
                placeholder='Lowest price (RMB)'
                type='number'
                onChange={this.handlePriceChange}
                variant='outlined'
              />
              <TextField
                placeholder='Additional Details (e.g. Student Price)'
                onChange={this.handlePriceDetailsChange}
                variant='outlined'
              />
            </div>
            <br />
            <Button onClick={this.refreshOutput} variant='outlined'>
              Generate Output
            </Button>
          </TextInputs>
          <ImageInput>
            <div>
              <div>
                <Button onClick={this.openGenerateQR} variant='outlined'>
                  Let's go generate a QR code!
                </Button>
                <br />
              </div>
              <br />
              <h> Poster URL </h> <br />
              <TextField
                onChange={this.refreshPicture}
                placeholder='Poster URL'
                variant='outlined'
              />
              <br />
              <br />
              <h> QR Code URL </h> <br />
              <TextField
                onChange={this.refreshCode}
                placeholder='QR Code URL'
                variant='outlined'
              />
              <Button onClick={this.clearLink} variant='outlined'>
                Clear Links
              </Button>
              <br />
              <br />
              <br />
              <text>Shift the Qr Codes</text> <br />
              <UpButton onClick={this.shiftUp} variant='outlined'>
                Up
              </UpButton>
              <br />
              <Button onClick={this.shiftLeft} variant='outlined'>
                left
              </Button>
              <Button onClick={this.shiftDown} variant='outlined'>
                down
              </Button>
              <Button onClick={this.shiftRight} variant='outlined'>
                right
              </Button>
              <br />
              <hr />
              <Button onClick={this.upSize} variant='outlined'>
                Bigger!
              </Button>
              <Button onClick={this.downSize} variant='outlined'>
                Smaller
              </Button>
              <br />
            </div>
            <ImagesDiv>
              <br />
              <FinalPoster src={this.state.imageLink} />
              <QRCode
                topPercent={this.state.topPercent}
                rightPercent={this.state.rightPercent}
                size={this.state.size}
                src={this.state.codeLink}
                alt='qrcode'
              />
            </ImagesDiv>
          </ImageInput>
        </Input>

        <br />

        <EndProduct>
          <text>Final Text (Copy Paste into WeiyouBot) </text>
          <Button variant='outlined'>Copy</Button>
          <br />
          <TextField
            value={this.state.output}
            multiline
            fullWidth
            variant='outlined'
          />
        </EndProduct>
      </div>
    );
  }
}
