import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function JobForm() {
  const [phone, setPhone] = useState('');
  const [jobPhoto, setJobPhoto] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [jobLocation, setJobLocation] = useState('');

  const handleFormSubmit = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('jobPhoto', {
      uri: jobPhoto.uri,
      type: jobPhoto.type,
      name: jobPhoto.fileName,
    });
    formData.append('jobDescription', jobDescription);
    formData.append('jobLocation', jobLocation);

    fetch('http://your-flask-server.com/save-job-details', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (response.ok) {
          console.log('Job details saved successfully');
        } else {
          console.log('Failed to save job details');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View>
      <Text>Phone:</Text>
      <TextInput value={phone} onChangeText={setPhone} />

      <Text>Job Photo:</Text>
      <Button title="Choose Photo" onPress={() => {}}>
        <Text>Choose Photo</Text>
      </Button>
      {jobPhoto && <Text>{jobPhoto.fileName}</Text>}

      <Text>Job Description:</Text>
      <TextInput multiline value={jobDescription} onChangeText={setJobDescription} />

      <Text>Job Location:</Text>
      <TextInput value={jobLocation} onChangeText={setJobLocation} />

      <Button title="Submit" onPress={handleFormSubmit}>
        <Text>Submit</Text>
      </Button>
    </View>
  );
}

 
