import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import emoji from 'node-emoji';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import moment from 'moment';

const Input = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;
const EndProduct = styled.div`
  width: 50%;
`;

const Homepage = styled.div`
  font-family: comfortaa;
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
      size: 7,
      imageLink: '',
      codeLink: '',
      leadInText: '',
      mainText: '',
      date: '',
      location: '',
      price: '',
      priceDetail: '',
      dateRange: {
        selection: {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      }
    };
  }
  clearLink = () => {
    this.setState({
      imageLink: '',
      codeLink: ''
    });
  };
  handleRangeChange = (which, payload) => {
    console.log(which, payload);
    this.setState({
      [which]: {
        ...this.state[which],
        ...payload
      }
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
      date: e.target.value
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
  clearTexts = () => {
    this.setState({
      leadInText: '',
      mainText: '',
      date: '',
      location: '',
      price: '',
      priceDetail: ''
    });
  };

  checkDate = () => {
    console.log(this.state.dateRange.selection.startDate);
    console.log(this.state.dateRange.selection.endDate);
  };
  validateDate = dateRange => {
    let startDate = dateRange.selection.startDate;
    let endDate = dateRange.selection.endDate;

    let startString = this.convertDateToString(startDate);
    let endString = this.convertDateToString(endDate);
    if (startString === endString) {
      return startString;
    } else {
      let returnString = startString + ' - ' + endString;
      return returnString;
    }
  };

  convertDateToString = date => {
    return moment(date).format('MMM Do (ddd) ');
  };
  refreshOutput = () => {
    const {
      leadInText,
      mainText,
      dateRange,
      location,
      price,
      priceDetail
    } = this.state;

    let newDate = this.validateDate(dateRange);
    let result;
    let newPrice = '';
    if (priceDetail === undefined || priceDetail === '') {
      newPrice = price + 'RMB';
    } else {
      newPrice = price + 'RMB (' + priceDetail + ')';
    }
    result =
      mainText +
      '\n' +
      '\n' +
      emoji.get('stopwatch') +
      newDate +
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

    if (leadInText !== undefined || leadInText !== '') {
      result = leadInText + '\n\n' + result;
    }

    this.setState({
      output: result
    });
  };

  render() {
    return (
      <Homepage>
        <Input>
          <TextInputs>
            <Button onClick={this.open247} variant='outlined'>
              Let's go to 247Ticket's Website!
            </Button>
            <br />
            <br />
            <hr />
            <br />
            <Button onClick={this.clearTexts} variant='outlined'>
              Clear Inputs
            </Button>
            <br />
            <br />
            <div>
              <h> Lead-in Text (Optional) </h>
              <br />
              <TextField
                onChange={this.handleLeadInTextUpdate}
                value={this.state.leadInText}
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
                value={this.state.mainText}
                placeholder='Your main descriptions here'
                multiline
                fullWidth
                variant='outlined'
                rows='6'
              />
            </div>

            <div>
              <br />
              <h onClick={this.checkDate}> Date (and Time) </h>
              <br />
              <DateRange
                onChange={this.handleRangeChange.bind(this, 'dateRange')}
                ranges={[this.state.dateRange.selection]}
              />
            </div>

            <div>
              <br />
              <h> Place </h>
              <br />
              <TextField
                onChange={this.handleLocationUpdate}
                value={this.state.location}
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
                value={this.state.price}
                onChange={this.handlePriceChange}
                variant='outlined'
              />
              <TextField
                placeholder='Additional Details (e.g. Student Price)'
                value={this.state.priceDetail}
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
                <br />
                <Button onClick={this.openGenerateQR} variant='outlined'>
                  Let's go generate a QR code!
                </Button>
                <br />
                <br />
                <hr />
                <br />
              </div>
              <Button onClick={this.clearLink} variant='outlined'>
                Clear Links
              </Button>
              <br />
              <br />
              <h> Poster URL </h> <br />
              <TextField
                onChange={this.refreshPicture}
                placeholder='Poster URL'
                variant='outlined'
                value={this.state.imageLink}
              />
              <br />
              <br />
              <h> QR Code URL </h> <br />
              <TextField
                onChange={this.refreshCode}
                placeholder='QR Code URL'
                variant='outlined'
                value={this.state.codeLink}
              />
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
          <br />
          <TextField
            value={this.state.output}
            multiline
            fullWidth
            variant='outlined'
          />
        </EndProduct>
      </Homepage>
    );
  }
}
