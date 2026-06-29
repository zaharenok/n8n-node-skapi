# Contributing to SkAPI.pro n8n Node

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/oleg-zaharenok/skapi-pro-n8n.git
   cd skapi-pro-n8n
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Link to local n8n**
   ```bash
   cd ~/.n8n
   npm link ../path/to/skapi-pro-n8n
   ```

5. **Start n8n**
   ```bash
   n8n start
   ```

## Project Structure

```
skapi-pro-n8n/
├── src/
│   ├── credentials/
│   │   └── SkapiApi.credentials.ts    # API credentials definition
│   ├── nodes/
│   │   ├── SkapiPro.node.ts           # Main node implementation
│   │   ├── index.ts                    # Node exports
│   │   └── operations/
│   │       ├── CheckJoinRequests.ts   # Check join requests
│   │       ├── ProcessJoinRequest.ts  # Approve/decline requests
│   │       ├── CheckMessages.ts       # Check messages
│   │       ├── CheckNotifications.ts   # Check notifications
│   │       └── SendWelcomeMessage.ts  # Send welcome messages
│   └── index.ts                        # Main entry point
├── dist/                                # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## Adding a New Operation

1. **Create the operation file**
   ```bash
   touch src/nodes/operations/YourOperation.ts
   ```

2. **Implement the operation**
   ```typescript
   import { IExecuteFunctions } from 'n8n-workflow';
   import axios from 'axios';

   export async function yourOperation(
     executeFunctions: IExecuteFunctions,
     jwtToken: string,
     clientId?: string
   ): Promise<any> {
     // Your implementation here
   }
   ```

3. **Register in SkapiPro.node.ts**
   - Import the operation
   - Add to the properties array
   - Add case in execute switch statement

4. **Build and test**
   ```bash
   npm run build
   ```

## Code Style

- **TypeScript**: Use modern TypeScript features
- **Formatting**: Use Prettier (default config)
- **Comments**: JSDoc for public APIs
- **Error Handling**: Always try-catch API calls

### Example

```typescript
/**
 * Your operation description
 */
export async function yourOperation(
  executeFunctions: IExecuteFunctions,
  jwtToken: string,
  clientId?: string
): Promise<any> {
  try {
    const param = executeFunctions.getNodeParameter('param', 0) as string;
    
    const response = await axios.post(
      'https://api.skapi.pro/endpoint',
      { param, jwt_token: jwtToken, client_id: clientId }
    );

    if (response.data.success) {
      return response.data.result;
    } else {
      throw new Error(response.data.error || 'Operation failed');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API Error: ${error.response?.data?.detail || error.message}`);
    }
    throw error;
  }
}
```

## Testing

### Manual Testing

1. Create a test workflow in n8n
2. Add SkAPI.pro node
3. Test each operation
4. Verify output data

### Unit Tests (TODO)

We're working on adding unit tests:

```bash
npm test
```

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests (if applicable)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### PR Checklist

- [ ] Code follows the project style
- [ ] Changes are documented in README.md
- [ ] Examples added to EXAMPLES.md
- [ ] Build passes (`npm run build`)
- [ ] No TypeScript errors

## API Integration

When adding new API endpoints:

1. Check the [SkAPI.pro API documentation](https://skapi.pro/docs)
2. Implement the operation following existing patterns
3. Handle errors gracefully
4. Add rate limiting awareness
5. Document the new operation

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create git tag
4. Build the project
5. Publish to npm
6. Create GitHub release

## Issues

### Bug Reports

Include:
- n8n version
- Node version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/logs if applicable

### Feature Requests

Include:
- Use case description
- Proposed solution
- Alternative approaches considered
- Examples of similar features

## Questions?

- Open an issue on GitHub
- Email: support@skapi.pro
- Check the [main documentation](https://skapi.pro/docs)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
