import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import emoji from 'node-emoji';

const Input = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const TextInputs = styled.div`
  padding: 20px;
`;

const ImageInput = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 2fr;
`;
const FinalPoster = styled.img`
  z-index: 9;
  width: 100%;
`;

const QRCode = styled.img`
  z-index: 10;
  width: 30%;
`;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: ''
    };
  }

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

  handleMainTextUpdate = e => {
    const { value } = e.target;
    this.setState({
      mainText: value.trim()
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
      imageLink: e.target.value.trim()
    });
  };

  refreshCode = e => {
    this.setState({
      codeLink: e.target.value.trim()
    });
  };

  refreshOutput = () => {
    const { leadInText, mainText, date, location, price } = this.state;

    let result;
    result =
      mainText +
      '\n' +
      '\n' +
      emoji.get('stopwatch') +
      ' ' +
      date +
      '\n' +
      emoji.get('round_pushpin') +
      ' ' +
      location +
      '\n' +
      emoji.get('moneybag') +
      ' ' +
      'From ' +
      price +
      ' RMB' +
      '\n' +
      '\n' +
      emoji.get('camera_with_flash') +
      emoji.get('camera_with_flash') +
      'Extract the QR code to open our mini program and find out more!';

    if (leadInText !== undefined) {
      result = leadInText + result;
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
              <text> Lead-in Text (Optional) </text>
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
              <text> Main Description </text>
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
              <text> Date (and Time) </text>
              <br />
              <TextField
                placeholder='What date is the event?'
                onChange={this.handleDateChange}
                variant='outlined'
              />
              {/* <DateRangePicker /> */}
            </div>

            <div>
              <br />
              <text> Place </text>
              <br />
              <TextField
                onChange={this.handleLocationUpdate}
                placeholder='Where is this event?'
                variant='outlined'
              />
            </div>

            <div>
              <br />
              <text> Price and additional details </text>
              <br />
              <TextField
                placeholder='Lowest price (RMB)'
                type='number'
                onChange={this.handlePriceChange}
                variant='outlined'
              />
              <TextField
                placeholder='Additional Details (e.g. Student Price)'
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
              <text> Poster URL </text> <br />
              <TextField
                onChange={this.refreshPicture}
                placeholder='Poster URL'
                variant='outlined'
              />
              <br />
              <br />
              <text> QR Code URL </text> <br />
              <TextField
                onChange={this.refreshCode}
                placeholder='QR Code URL'
                variant='outlined'
              />
              <br />
            </div>
            <div>
              <FinalPoster src={this.state.imageLink} />
              <QRCode src={this.state.codeLink} />
            </div>
          </ImageInput>
        </Input>

        <br />

        <div>
          <text>Final Text (Copy Paste into WeiyouBot) </text>
          <Button variant='outlined'>Copy</Button>
          <br />
          <TextField
            value={this.state.output}
            fullWidth
            multiline
            variant='outlined'
          />
        </div>
      </div>
    );
  }
}
