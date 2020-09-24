import React from 'react';
import {Text, Linking} from 'react-native';

interface Props {
  children?: any;
  style?: any;
  linkColor?: string;
}
const HyperText = (props: Props) => {
  if (typeof props.children === 'string') {
    // Split the content on space characters
    let words = props.children.split(/\s/);
    // Loop through the words
    let contents = words.map(function (word, i) {
      // Space if the word isn't the very last in the set, thus not requiring a space after it
      let separator = i < words.length - 1 ? ' ' : '';
      // The word is a URL, return the URL wrapped in a custom <Link> component
      // eslint-disable-next-line no-useless-escape
      if (word.match(/^https?\:\//) || word.match(/^http?\:\//)) {
        return (
          <Link
            key={i}
            url={word}
            style={[props.style, {color: props.linkColor}]}>
            {word}
            {separator}
          </Link>
        );
        // The word is not a URL, return the word as-is
      } else {
        return word + separator;
      }
    });
    return <Text style={props.style}>{contents}</Text>;
  } else {
    console.log(
      'Attempted to use <HyperText> with nested components. This component only supports plain text children.',
    );
    return <Text style={props.style}>{this.props.children}</Text>;
  }
};

interface LinkProps {
  url: string;
  children: any;
  style: any;
}

const Link = (props: LinkProps) => {
  const _openUrl = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  return (
    <Text onPress={() => _openUrl(props.url)} style={props.style}>
      {props.children}
    </Text>
  );
};

export default HyperText;
