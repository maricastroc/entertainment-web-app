import {
  CheckboxContainer,
  CheckboxLabel,
  CheckboxText,
  HiddenCheckbox,
  StyledCheckbox,
} from './styles'

export const Checkbox = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: () => void
  label: string
}) => (
  <CheckboxContainer>
    <CheckboxLabel>
      <HiddenCheckbox type="checkbox" checked={checked} onChange={onChange} />
      <StyledCheckbox
        css={{
          background: checked ? '#26334F' : 'transparent',
          '&:after': {
            content: checked ? '""' : 'none',
            display: 'block',
            width: '12px',
            height: '12px',
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E\")",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          },
        }}
      />
      <CheckboxText>{label}</CheckboxText>
    </CheckboxLabel>
  </CheckboxContainer>
)
